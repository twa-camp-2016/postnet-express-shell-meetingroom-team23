let _ = require('lodash');
let {loadAllCode} = require('./codes');
class ZipcodeToBarcode {
    zipCodeToBarcode(zipCode) {
    //判断合法性
    if (zipCode.length !== 32 && zipCode.length !== 52) {
        return {text: '不合法', type: false}
    }
    if (zipCode.split("").some((t)=> {
            if (t !== ':' && t !== '|')return true;
        })) {
        return {text: '不合法', type: false}
    }
    //对合法zipCode进行操作
    let allCodes = loadAllCode();
    let formattedZipCodes = formatZipCode(zipCode, allCodes);
    if (formattedZipCodes === false) {
        return formattedZipCodes;
    }
    let zipCodes = transformZipCode(formattedZipCodes.text, allCodes);
    let checkedZipCode = checkCD(zipCodes);
    if (checkedZipCode.text != '不合法') {
        return {text: buildPostcodeString(checkedZipCode), type: true};
    } else {
        return checkedZipCode;
    }
}
}



function formatZipCode(zipCode, allCodes) {
    // let codes = allCodes.map(temp => {return temp.code});
    let codes = [];
    for (let code of allCodes) {
        codes.push(code.code);
    }
    let string = zipCode.substring(1, zipCode.length - 1);
    let zipCodeArray = string.split("");
    zipCodeArray = _.chunk(zipCodeArray, 5).map(temp => {
        return temp.join("")
    });
    return {text: zipCodeArray, type: true}
}
function transformZipCode(formattedZipCodes, allCodes) {
    return formattedZipCodes.map((formatZipCode)=> {
        let temp = allCodes.find(temp => formatZipCode == temp.code);
        return {No: temp.No, code: temp.code};
    });
}
function checkCD(zipCodes) {
    let total = 0;
    zipCodes.map(temp => total += parseInt(temp.No));
    if (total % 10 == 0) {
        zipCodes.pop();
        return zipCodes;
    } else {
        return {text: '不合法', type: false}
    }
}
function buildPostcodeString(checkedZipCode) {
    let arr = checkedZipCode.map(temp => {
        return temp.No
    });
    if (arr.length == 9) {
        arr.splice(5, 0, '-');
    }
    return arr.join("");
}

module.exports = ZipcodeToBarcode;