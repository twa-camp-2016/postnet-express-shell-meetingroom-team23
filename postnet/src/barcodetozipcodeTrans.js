let _ = require("lodash");
let {loadAllItems} = require("../src/loadItems.js");

let  coreResponse = require('./coreResponse');
// console.log('aaaa');

class barcodetozipcodeTrans{
    constructor(){}

    run(barcodes){
          return this.barCodeToZipCode(barcodes);
    }

    barCodeToZipCode(Barcodes) {
        let flag = this.checkBarcodeFormate(Barcodes);
        if(flag === true){
            let finalzipcode = this.BarTransformBarZip(Barcodes);
            return new coreResponse(finalzipcode);
        }else {return new coreResponse(false);}
    }

    checkBarcodeFormate(Barcodes) {
        // let AllItems = loadAllItems();
        if(this._checkBarFrame(Barcodes) === true  && this._checkBarlength(Barcodes) === true ){
            let matchedBarcodes = _.chain(Barcodes).split('').drop().dropRight().filter(n => {return n !== '-'}).chunk(5).map(a => {return a.join('')}).value();
            if (this._checkBarcodeFormate(matchedBarcodes,loadAllItems()) === true  && this._checkCd(matchedBarcodes,loadAllItems())=== true){
                return true;
            }else {
                return false;
            }
        }else { return false;}
    }

    _checkBarlength(Barcodes) {
        if (Barcodes.length === 32 || Barcodes.length === 52) {
            return true;
        }
        else {
            return false;
        }
    }

    _checkBarFrame(Barcodes) {
        let bar = Barcodes.split('');
        if (bar[0] === '|' && bar[bar.length -1] === '|') {
            return true;
        }
        else {
            return false;
        }
    }

    _checkBarcodeFormate(matchedBarcodes,AllItems) {
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

    _checkCd(matchedBarcodes,AllItems) {
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

    BarTransformBarZip(testedBarcodes) {
        let formatedBarcodes = this.getFormatedBarcode(testedBarcodes);
        // let AllItems = loadAllItems();
        let matedBarcodes = this.matchByTableZipcode(formatedBarcodes,loadAllItems());
        let finalzipcode = this.recheckFormate(matedBarcodes);

        return finalzipcode;
    }
    getFormatedBarcode(testedBarcodes) {
        return _.chain(testedBarcodes).split('').drop().dropRight().chunk(5).map(a => {
            return a.join('')
        }).value();
    }

    matchByTableZipcode(formatedBarcodes, AllItems) {
        return _.chain(formatedBarcodes).dropRight().map((element) => {
            let code = _.find(AllItems, (code) => {
                if (element === code.zipcode) {
                    return code;
                }
            });
            return code.barcode;
        }).join('').value();
    }

    recheckFormate(matchedBarcodes) {
        let a = matchedBarcodes;
        if (matchedBarcodes.length === 9) {
            matchedBarcodes.split('');

            return `${matchedBarcodes.slice(0, 5)}-${matchedBarcodes.slice(5)}`;
        }
        return a;
    }

}

module.exports = barcodetozipcodeTrans;




