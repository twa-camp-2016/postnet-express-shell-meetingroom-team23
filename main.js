/**
 * Created by zhuoyue on 16-8-5.
 */
'use strict';
let _ = require('lodash');
//条码转邮编

function checkZipCodeLength(zipCodeArray){
    return (zipCodeArray.length===32||zipCodeArray.length===52);
}
function checkElement(zipCodeArray){
    let  CodeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    if(zipCodeArray[0]===':'||zipCodeArray[zipCodeArray.length-1]===':')return false;
    let found=zipCodeArray.find((element)=>{
        return element!==':'&&element!=='|';
    });
    if (found) return false;
    let sortedFive =sortFive(zipCodeArray);
    let filterArray=(_.difference(sortedFive,CodeArray));
    if(filterArray.length>0)return false;
    return true;
}


function sortFive(zipCodeArray){
    let withoutBar=_.slice(zipCodeArray,1,zipCodeArray.length-1);
    let fiveSortArray=_.chunk(withoutBar,5);
    return fiveSortArray.map((element)=>{
        return  element.join('');
    });
}

function checkZipCode(zipCode){
    let zipCodeArray=zipCode.split('');
    return (checkZipCodeLength(zipCodeArray)&&checkElement(zipCodeArray));
}


function zipCodeToNumberArray(zipCode){
    let  CodeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let zipCodeArray=zipCode.split('');
    let sortFiveZipCode=sortFive(zipCodeArray);
    return sortFiveZipCode.map((element)=>{
        return _.indexOf(CodeArray,element);
    });
}


function checkCD(zipCodeNumberArray){
    return((_.sum(zipCodeNumberArray)%10)==0);
}

function buildBarcode(zipCodeNumberArray){
    let zipNumberWithoutCD=_.dropRight(zipCodeNumberArray,1);
    if(zipNumberWithoutCD.length===9){
        zipNumberWithoutCD.splice(5,0,'-');
    }
    return zipNumberWithoutCD.join('');
}

function zipCodeToBarcode(zipCode){
    if(checkZipCode(zipCode)){
        let zipCodeNumberArray=zipCodeToNumberArray(zipCode);
        if(checkCD(zipCodeNumberArray)){
            return  buildBarcode(zipCodeNumberArray);
        }
    }
    return false;
}

//邮编转条码
function formateBarcode(barcode){
    if(barcode.length===10){  //
        let hasGang= barcode.indexOf('-',5);
        let formatBarcode=barcode;
        if(hasGang===5){
            formatBarcode = barcode.replace('-', '');
        }
        return formatBarcode.split('');
    }
    return barcode.split('');
}

function checkIsAllNumber(barcode) {
    let barcodeArray =formateBarcode(barcode);
    let number=['1','2','3','4','5','6','7','8','9','0'];
    let  otherArray=_.difference(barcodeArray, number);
    if(otherArray.length>0)return false;
    return true;
}

function checkBarcodeLength(barcode){
    let hasGang= barcode.indexOf('-',5);
    if ((barcode.length===10)&&hasGang!==-1) return true;
    if(barcode.length===5||barcode.length===9) return true;
    return false;
}

function checkBarcode(barcode){
    // if (/^\d{5}$|^\d{9}$|^\d{5}-\d{4}$/.test(barcode)){
    //     checkIsAllNumber(barcode);
    //  }

    if( checkBarcodeLength(barcode)){

        return checkIsAllNumber(barcode);
    }
    return false;

}

function calculateCD(barcode) {
    let barcodeArray =formateBarcode(barcode);
    let barcodeNumArray = barcodeArray.map((element)=> {
        return parseInt(element);
    });
    let CD = _.sum(barcodeNumArray) % 10;
    if (CD !== 0) {
        CD = 10 - CD;
    }
    return CD;

}

function buildZipCode(CD,barcode,codeArray){
    let barcodeArray =formateBarcode(barcode);
    let zipString='|';
    let barcodeNumArray=barcodeArray.map((element)=>{
        return parseInt(element);
    });
    for(let num of barcodeNumArray) {
        zipString +=codeArray[num];
    }
    zipString +=codeArray[CD];
    zipString +='|';
    return zipString;
}

function BarcodeToZipCode(barcode){
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    if(checkBarcode(barcode)){
        let CD=calculateCD(barcode);
        return buildZipCode(CD,barcode,codeArray);
    }
    return false;
}


module.exports = {
    checkZipCode: checkZipCode,
    zipCodeToNumberArray:zipCodeToNumberArray,
    checkCD: checkCD,
    zipCodeToBarcode: zipCodeToBarcode,
    buildBarcode: buildBarcode,
    checkBarcode: checkBarcode,
    calculateCD: calculateCD,
    buildZipCode: buildZipCode,
    BarcodeToZipCode:BarcodeToZipCode
};
