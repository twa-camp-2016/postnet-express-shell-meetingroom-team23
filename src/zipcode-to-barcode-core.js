/**
 * Created by xjy on 8/4/16.
 */
"use strict";
let _ = require('lodash');
//字符串检验
function checkZipCode(zipcode) {
  let pattern = /^\d{5}$|^\d{9}$|^\d{5}-\d{4}$/;
  if (pattern.test(zipcode)) {
    return true;
  }
  return false;
}
//得到去掉‘-’的数字串并存入数组
function getReducedArray(zipcode) {
  let result = zipcode.split("");
  if (result.indexOf('-') !== -1) {
    result.splice(5, 1);
  }
  return result;
}
//得到校验码
function getCheckCode(zipcode) {
  let sum = 0;
  sum = zipcode.reduce(((zipcode, num)=> {
    zipcode += parseInt(num);
    return zipcode;
  }), 0);
  let code;
  if (sum % 10 === 0) {
    code = 0;
  }
  else {
    code = 10 - sum % 10;
  }
  return code;
}
//得到最终条码的两步
function getSubCodes(zipcode, allCodes, checkCode) {
  let result = [];
  zipcode.push(checkCode);
  result = zipcode.map((num)=> {
    return allCodes[num];
  });
  return result;
}
function getCodeString(subCodes) {
  let result = subCodes.join('');
  return '|' + result + "|";
}
//邮编转条码的转换函数
function changToCodes(zipcode) {
  let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
  let codeArray = getReducedArray(zipcode);
  let checkCode = getCheckCode(codeArray);
  let subCodes = getSubCodes(codeArray, allCodes, checkCode);
  let codeString = getCodeString(subCodes, checkCode);
  return codeString;
}
//邮编转条码的总函数
class ZipcodeToBarcodeCore {
  action(zipcode)
  {
    let checkResult = checkZipCode(zipcode);
    if (checkResult === true) {
      let finalString = changToCodes(zipcode);
      return finalString;
    }
    else {
      return false;
    }
  }
  check(zipcode){
    let type=checkZipCode(zipcode);
    return type;
  }
}
module.exports = ZipcodeToBarcodeCore;
