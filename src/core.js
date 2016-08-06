let _ = require('lodash');
let {loadAllBarcodes} = require('../src/barcodes.js');
//# 检验条码是否正确,并格式化 成为一个字符串
function checkedPostcode(postcode) {
    let pattern1 = /^\d{5}$/;
    let pattern2 = /^\d{9}$/;
    let pattern3 = /^\d{5}-\d{4}$/;
    let result = [];
    if (pattern1.test(postcode)) {
        result.push({no: postcode});
    }
    else if (pattern2.test(postcode)) {
        result.push({no: postcode});
    }
    else if (pattern3.test(postcode)) {
        let replace = _.camelCase(postcode);
        result.push({no: replace});
    }
    else {
        return {error: 'Please give right input', type: false};
    }
    return result;
}
//#2  格式化条码成为对象数组
function buildBarcodes(fomattefPostcode) {
    if (fomattefPostcode.type !== false) {
        let barcode = fomattefPostcode[0].no;//'450561234'
        //遍历字符串
        let result = barcode.split('');//['4','']
        return result.map((r) => {
            return {no: r}
        });
    } else {
        return {error: 'Please give right input', type: false};
    }
}
//#3 综合条码信息
function compositeBarcodes(barcodes, allBarcods) {
    if (barcodes.type !== false) {
        return barcodes.map((barcode) => {
            let result = allBarcods.find((allBarcod) => barcode.no === allBarcod.no);
            return {no: result.no, code: result.code};
        });
    } else {
        return {error: 'Please give right input', type: false};
    }
}
//#4 计算检验码,并找到检验码的code;
function calculatCheck(barcodes, allBarcods) {
    if (barcodes.type !== false) {

        let total = 0;
        let check = 0;
        let result = [];
        barcodes.map((barcode) => {
            total += parseFloat(barcode.no);
        });
        if (total % 10) {
            check = parseFloat(10 - (total % 10));
        } else {
            check = 0;
        }
        let checkInfo = allBarcods.find((allBarcod) => parseInt(allBarcod.no) === check);
        result.push(checkInfo);
        return result;
    }
    else {
        return {error: 'Please give right input', type: false};
    }
}
//#5 输出条码
function printBarcodes(barcodes, checks) {
    if (barcodes.type !== false) {
        let result = ['|'];
        barcodes.map((barcode) => {
            result.push(barcode.code)
        });
        checks.map((check) => {
            result.push(check.code)
        });
        result.push('|');
        return result.join('');
    }
    else {
        return {error: 'Please give right input', type: false};
    }
}
//#6 综合测试
function print(barcode) {
    let allBarcodes = loadAllBarcodes();
    let formattedBarcode = checkedPostcode(barcode);
    let build = buildBarcodes(formattedBarcode, allBarcodes);
    let composite = compositeBarcodes(build, allBarcodes);
    let check = calculatCheck(composite, allBarcodes);
    let zipcode = printBarcodes(composite, check);
    return zipcode;//printBarcodes(composite, check);
}
//条码转邮编 #1 格式化(去掉两侧|)
function getformatted(barcode) {
    if (barcode.length === 32 || barcode.length === 52) {
            return barcode.substring(1, barcode.length - 1);

    } else {
        return {error: 'Please give right input', type: false};
    }
}
//条码转邮编 #2 格式化(5个分组)
function formattedGroup(formattedBarcodes) {
    if (formattedBarcodes.type !== false) {
        let res = _.chunk(formattedBarcodes, 5);
        return res.map((r) => {
            return {code: r.join('')};
        });
    }
    else {
        return {error: 'Please give right input', type: false};
    }
}

//条码转邮编 #3 查找对应的数字
function buildAll(barcodes, allBarcodes) {
    if (barcodes.type !== false) {
        return barcodes.map((barcode) => {
            let noInfo = allBarcodes.find((allBarcode) => barcode.code === allBarcode.code);
            return {no: noInfo.no, code: noInfo.code};
        });
    }
    else {
        return {error: 'Please give right input', type: false};
    }
}
//条码转邮编 #4 找出并验证检验码
function checkcode(barcodes) {
    if (barcodes.type !== false) {
        let total = 0;
        let result = '';
        barcodes.map((barcode) => {
            total += parseFloat(barcode.no);
            result += barcode.no;
        });
        if (total % 10 === 0) {
            return result.substring(0, result.length - 1);
        } else {
            return {error: 'Please give right input', type: false};

            // return 'Please give right input';
        }
    } else {
        return {error: 'Please give right input', type: false};
    }

}
//条码转邮编 #5 输出条码
function printPostcode(codes) {
    if (codes.type !== false) {
        if (codes.length === 9) {
            let array = codes.split('');
            array.splice(5, 0, '-');//[]
            return array.join('');
        } else {
            return codes;
        }
    }
    else {
        return {error: 'Please give right input', type: false};
    }

}
//#6 综合测试
function finialPostcode(barcode) {
    let allBarcodes = loadAllBarcodes();
    let formatted = getformatted(barcode);//格式化
    let groupcodes = formattedGroup(formatted);//分组
    let allcodes = buildAll(groupcodes, allBarcodes);//查找对应的数字
    let checked = checkcode(allcodes);//验证检验码
    return printPostcode(checked);
}
module.exports = {
    getformatted: getformatted,
    checkedPostcode: checkedPostcode,
    buildBarcodes: buildBarcodes,
    compositeBarcodes: compositeBarcodes,
    calculatCheck: calculatCheck,
    printBarcodes: printBarcodes,
    formattedGroup: formattedGroup,
    buildAll: buildAll,
    checkcode: checkcode,
    printPostcode: printPostcode,
    print: print,
    finialPostcode: finialPostcode,
};
