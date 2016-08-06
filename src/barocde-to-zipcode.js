"use strict";
let _ = require('lodash');
let {loadAllCode} = require('../src/codes');


class BarcodeToZipcode {
    barcodeToZipCode(barcode) {
        let allCodes = loadAllCode();
        let formattedBarcode = formatCheckedBarcode(barcode);
        if (formattedBarcode.text != '邮编不合法') {
            let barcodeArray = transformBarCodes(formattedBarcode, allCodes);
            return {text: buildZipCodeString(barcodeArray), type: true};
        } else {
            return formattedBarcode;
        }
    }
}

function formatCheckedBarcode(barcode) {
    let checked = _checkBarcode(barcode);
    if (checked.text == '邮编不合法') {
        return checked;
    }
    return checked.text.split("");
}
function _checkBarcode(barcode) {
    let exp5 = /^\d{5}$/;
    let exp9 = /^\d{9}$/;
    let exp10 = /^\d{5}\-\d{4}$/;
    if (exp5.test(barcode)) {
        return {text: barcode, type: true};
    } else if (exp9.test(barcode)) {
        return {text: barcode, type: true};
    } else if (exp10.test(barcode)) {
        return {text: _.camelCase(barcode), type: true};
    } else {
        return {text: '邮编不合法', type: false};
    }
}
function transformBarCodes(formattedBarcode, allCodes) {
    let CD = _calculateCD(formattedBarcode);
    return _transformBarcode(CD, formattedBarcode, allCodes);
}
function _calculateCD(formattedBarcode) {
    let total = 0;
    let CD;
    formattedBarcode.map(temp => total += parseInt(temp));
    if (total % 10) {
        CD = 10 - total % 10;
    } else {
        CD = 0;
    }
    return CD.toString();
}
function _transformBarcode(CD, formattedBarcode, allCodes) {
    formattedBarcode.push(CD);
    return formattedBarcode.map(formatted => {
        let temp = allCodes.find(temp => formatted == temp.No);
        return {No: temp.No, code: temp.code};
    });
}
function buildZipCodeString(barcodeArray) {
    let string = '|';
    barcodeArray.map(temp => string += temp.code);
    string += '|';
    return string;
}
module.exports = BarcodeToZipcode;


// let _ = require("lodash");
// let {loadAllCode} = require('../src/codes');
// "use strict";
// function barcodeToZipCode(barcode) {
//     let allCodes = loadAllCode();
//     let formattedBarcode = formatCheckedBarcode(barcode);
//     if (formattedBarcode.text != '邮编不合法') {
//         let barcodeArray = transformBarCodes(formattedBarcode, allCodes);
//         return {text: buildZipCodeString(barcodeArray), type: true};
//     } else {
//         return formattedBarcode;
//     }
// }
// function formatCheckedBarcode(barcode) {
//     let checked = _checkBarcode(barcode);
//     if (checked.text == '邮编不合法') {
//         return checked;
//     }
//     return checked.text.split("");
// }
// function _checkBarcode(barcode) {
//     let exp5 = /^\d{5}$/;
//     let exp9 = /^\d{9}$/;
//     let exp10 = /^\d{5}\-\d{4}$/;
//     if (exp5.test(barcode)) {
//         return {text: barcode, type: true};
//     } else if (exp9.test(barcode)) {
//         return {text: barcode, type: true};
//     } else if (exp10.test(barcode)) {
//         return {text: _.camelCase(barcode), type: true};
//     } else {
//         return {text: '邮编不合法', type: false};
//     }
// }
// function transformBarCodes(formattedBarcode, allCodes) {
//     let CD = _calculateCD(formattedBarcode);
//     return _transformBarcode(CD, formattedBarcode, allCodes);
// }
// function _calculateCD(formattedBarcode) {
//     let total = 0;
//     let CD;
//     formattedBarcode.map(temp => total += parseInt(temp));
//     if (total % 10) {
//         CD = 10 - total % 10;
//     } else {
//         CD = 0;
//     }
//     return CD.toString();
// }
// function _transformBarcode(CD, formattedBarcode, allCodes) {
//     formattedBarcode.push(CD);
//     return formattedBarcode.map(formatted => {
//         let temp = allCodes.find(temp => formatted == temp.No);
//         return {No: temp.No, code: temp.code};
//     });
// }
// function buildZipCodeString(barcodeArray) {
//     let string = '|';
//     barcodeArray.map(temp => string += temp.code);
//     string += '|';
//     return string;
// }
