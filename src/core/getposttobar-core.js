/**
 * Created by SONY on 2016/8/4.
 */
let _ = require("lodash");
class PostToBar {
    do(postcode) {
        let checkedcode = checkPostCode(postcode);
        let formattedcode = formatPostCode(checkedcode);
        let matchcode = matchBarcodes(formattedcode, _getBarcodes());
        let barcodeString = getBarcodeString(matchcode);
        return barcodeString;

    }

    checkPostCode(postcode) {
        let flag = false;
        if (postcode.length === 5 || postcode.length === 9 || (postcode.length === 10 && postcode.charAt(5) === '-')) {
            let postcodeno = postcode.replace('-', '').split('');
            let temp = postcodeno.map((element)=> {
                let reg = /\d/;
                return reg.test(element)
            });
            if (!temp.includes(false)) {
                flag = true;
            }
        }
        if (flag) {
            return postcode;
        } else {
            return flag;
        }
    }
}
function _getBarcodes() {
    return ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
}

function formatPostCode(postcode) {
    if (postcode !== false) {
        if (postcode.includes('-')) {
            let temp = postcode.split('-');
            postcode = temp[0] + temp[1];
        }
    }
    return postcode;
}
function matchBarcodes(postcode, barcodes) {
    if (postcode !== false) {
        let postcodes = postcode.split('');
        let postcodesInt = postcodes.map((postcode)=> {
            return parseInt(postcode);
        });
        let sum = _.sum(postcodesInt);
        if (sum % 10 === 0) {
            postcodes.push('0');
        } else {
            postcodes.push(parseFloat(10 - sum % 10));
        }
        return postcodes.map((postcode)=> {
            return barcodes[parseInt(postcode)];
        });
    }
    return false;
}
function getBarcodeString(barcodes) {
    if (barcodes !== false) {
        let barcodeString = '|';
        let codesString = barcodes.join('');
        barcodeString += codesString;
        barcodeString += '|';
        return barcodeString;
    }
    return false;
}

module.exports = PostToBar;