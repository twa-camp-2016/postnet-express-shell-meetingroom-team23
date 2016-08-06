/**
 * Created by xjy on 8/4/16.
 */
"use strict";
let _ = require('lodash');
//将条码每5位分割存入数组
function splitStringBy5(barcode) {
  return _.chunk(barcode, 5).map((array)=> {
    return array.join("")
  })
}
//检查条码正确性
function checkBarcode(barcode, allCodes) {
  let length = barcode.length;
  let temps = barcode.substr(1, length - 2);
  let inputArray = splitStringBy5(temps);
  let different = (_.difference(inputArray, allCodes));
  let pattern = /^\|[|:]+\|$/;
  if ((length === 32 || length === 52 ) && (pattern.test(barcode)) && different.length === 0) {
    return true;
  } else {
    return false;
  }
}
function getFormatBarCode(barcode, checkNode) {
  let result = '';
  if (checkNode) {
    result = barcode.slice(1, barcode.length - 6);
  }
  return result;
}
function getBarCodesArray(formatBarcode, allCodes) {
  let result = [];
  let barcodes = formatBarcode.split("");
  let splitBarcodes = _.chunk(barcodes, 5);
  splitBarcodes = splitBarcodes.map((element)=> {
    return _.sum(element);
  });
  splitBarcodes.map((code)=> {
    for (let i = 0; i < allCodes.length; i++) {
      if (code === allCodes[i]) {
        result.push(i);
      }
    }
  });
  return result;
}
function getCodeToNumber(numberCodes) {
  let result = '';
  if (numberCodes.length === 9) {
    numberCodes.splice(5, 0, '-');
  }
  result = numberCodes.join("");
  return result;
}
function changeToPostcode(barcode, checkResult, allCodes) {
  let formatBarcode = getFormatBarCode(barcode, checkResult);
  let numberCodes = getBarCodesArray(formatBarcode, allCodes);
  let codeString = getCodeToNumber(numberCodes);
  return codeString;

}
class BarcodeToZipcodeCore {
  action(barcode) {
    let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let checkNode = checkBarcode(barcode, allCodes);
    if (checkNode) {
      let zipcode = changeToPostcode(barcode, checkNode, allCodes);
      return zipcode;
    }
    else {
      return false;
    }
  }
  check(barcode){
    let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let type=checkBarcode(barcode, allCodes);
    return type;
  }
}
module.exports = BarcodeToZipcodeCore;
