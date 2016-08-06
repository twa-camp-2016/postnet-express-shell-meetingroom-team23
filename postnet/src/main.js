"use strict";
let _ = require("lodash");
let {loadAllItems} = require("../src/loadItems.js");


function zipCodeToBarCode(zipcode) {

    let flag = checkZipCodeFormate(zipcode);
    if(flag === true){
        let finalbarcode = zipTransformBar(zipcode);
        return finalbarcode;
    }else { return false }
}

function _checklength(zipcode) {
    if (zipcode.length === 5 || zipcode.length === 9 || zipcode.length === 10) {
        return true;
    } else {
        return false;
    }
}
function _checknumber(zipcode) {
    let devi = zipcode.split('');
    let num = devi.filter(a => {
        return a.includes('-')
    });
    if (num.length === 1 || num.length === 0) {
        return true;
    }
    else {
        return false;
    }
}
function _checklocation(zipcode) {
    let local = zipcode.indexOf('-');
    if (local === 5 || local === -1) {
        return true;
    } else {
        return false;
    }
}
function _checkletter(zipcode) {
    if (!/^[0-9]*$/.test(zipcode)) {
        if (zipcode.length === 10 && zipcode.includes('-')) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function _checkzipcd(zipcode) {
    let testedzipcodes = _.chain(zipcode).split('').filter(element => { return element !== '-'}).value();
    let checkCd = 10 - _.chain(testedzipcodes).dropRight().reduce((firstcd, element) => {
            return firstcd += _.parseInt(element);
        },0) % 10;
    if (checkCd === 10) {
        checkCd = 0
    }

    if(_.toString(checkCd) === _.last(testedzipcodes)){
        return true;
    }
    else { return false }
}
function checkZipCodeFormate(zipcode) {
    if (_checklength(zipcode) === true && _checknumber(zipcode) === true && _checklocation(zipcode) === true && _checkletter(zipcode) === true) {

        return true;
    } else {
        return false;
    }
}


function zipTransformBar(zipcode) {
    let testedzipcodes = _.chain(zipcode).split('').filter(element => { return element !== '-'}).value();

    let formatedzipcodes = getFormatedZipCode(testedzipcodes);

    let AllItems = loadAllItems();
    let matchedbarcodes = matchByTableBarcode(formatedzipcodes, AllItems);

    let finalbarcodes = addExtraForm(matchedbarcodes);
    return finalbarcodes;
}
function getFormatedZipCode(testedzipcodes) {
    let checkCd = 10 - _.reduce(testedzipcodes, (firstcd, element) => {
            return firstcd += _.parseInt(element)
        }, 0) % 10;
    if (checkCd === 10) {
        checkCd = 0
    }
    let formatedzipcodes = _.flattenDeep([testedzipcodes,_.toString(checkCd)]);;
    return formatedzipcodes;
}

function matchByTableBarcode(formatedzipcodes, AllItems) {
    let matchedBarcodes = _.map(formatedzipcodes, (element) => {
        let zipcode = _.find(AllItems, (code) => {
              return code.barcode === element;
        });
        return zipcode.zipcode;
    });
    return matchedBarcodes;
}


function addExtraForm(matchedbarcodes) {
    let precode = _.flatten(['|', matchedbarcodes, '|']);
    let finalbarcodes = precode.join('');
    return finalbarcodes;
}












function braCodeToZipCode(Barcodes) {
        let flag = checkBarcodeFormate(Barcodes);
        if(flag === true){
             let finalzipcode = BarTransformBarZip(Barcodes);

            return finalzipcode;
        }else {return false;}
}

function checkBarcodeFormate(Barcodes) {
    let AllItems = loadAllItems();
    if(_checkBarFrame(Barcodes) === true  && _checkBarlength(Barcodes) === true ){
        let matchedBarcodes = _.chain(Barcodes).split('').drop().dropRight().filter(n => {return n !== '-'}).chunk(5).map(a => {return a.join('')}).value();
        if ( _checkBarcodeFormate(matchedBarcodes,AllItems) === true  &&  _checkCd(matchedBarcodes,AllItems)=== true){
            return true;
        }else {
            return false;
        }
    }else { return false;}
}

function _checkBarlength(Barcodes) {
    if (Barcodes.length === 32 || Barcodes.length === 52) {
        return true;
    }
    else {
        return false;
    }
}

function _checkBarFrame(Barcodes) {
    let bar = Barcodes.split('');
    if (bar[0] === '|' && bar[bar.length -1] === '|') {
        return true;
    }
    else {
        return false;
    }
}

function _checkBarcodeFormate(matchedBarcodes,AllItems) {
    let result = _.map(matchedBarcodes,(element) => {
          let a = _.find(AllItems, n => {return element === n.zipcode});
          if( a === undefined){ return 0}
          else {return  1}
    });
    if (result.includes(0)) {
        return false;
    }
    else {
        return true;
    }
}
function _checkCd(matchedBarcodes,AllItems) {
    let rightcd =10 -  _.chain(matchedBarcodes).dropRight().reduce((result,element) => {
          let a = _.find(AllItems, item => {return item.zipcode === element});
          return result += parseInt(a.barcode);
    },0).value()%10;
    if (rightcd === 10) {
        rightcd = 0
    }

    let code = [7, 4, 2, 1, 0];
    let check = _.chain(matchedBarcodes).takeRight().split('').map(a => {
        if (a === '|') {
            return 1
        }
        else if (a === ':') {
            return 0
        }
    }).value();

    let checkcd = 0;
    for (let i = 0; i < code.length; i++) {
        checkcd += code[i] * check[i];
    }
    if (checkcd === 11) {
        checkcd = 0
    }
    if (checkcd === rightcd) {
        return true
    }
    else {
        return false;
    }
}

function BarTransformBarZip(testedBarcodes) {
       let formatedBarcodes = getFormatedBarcode(testedBarcodes);
       let AllItems = loadAllItems();
       let matedBarcodes = matchByTableZipcode(formatedBarcodes,AllItems);
       let finalzipcode = recheckFormate(matedBarcodes);

       return finalzipcode;
}
function getFormatedBarcode(testedBarcodes) {
    return _.chain(testedBarcodes).split('').drop().dropRight().chunk(5).map(a => {
        return a.join('')
    }).value();
}
function matchByTableZipcode(formatedBarcodes, AllItems) {
    return _.chain(formatedBarcodes).dropRight().map((element) => {
        let code = _.find(AllItems, (code) => {
            if (element === code.zipcode) {
                return code;
            }
        });
        return code.barcode;
    }).join('').value();
}

function recheckFormate(matchedBarcodes) {
    let a = matchedBarcodes;
    if (matchedBarcodes.length === 9) {
        matchedBarcodes.split('');

        return `${matchedBarcodes.slice(0, 5)}-${matchedBarcodes.slice(5)}`;
    }
    return a;
}

module.exports = {
    zipCodeToBarCode: zipCodeToBarCode,

    checkZipCodeFormate: checkZipCodeFormate,

    zipTransformBar: zipTransformBar,
    getFormatedZipCode: getFormatedZipCode,
    matchByTableBarcode: matchByTableBarcode,
    addExtraForm: addExtraForm,

    braCodeToZipCode:braCodeToZipCode,

    checkBarcodeFormate:checkBarcodeFormate,

    BarTransformBarZip:BarTransformBarZip,
    getFormatedBarcode: getFormatedBarcode,
    matchByTableZipcode: matchByTableZipcode,
    recheckFormate: recheckFormate,

};
