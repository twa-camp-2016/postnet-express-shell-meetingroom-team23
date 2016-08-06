let _ = require("lodash");
let {loadAllItems} = require("../src/loadItems.js");
let coreResponse = require('./coreResponse');

class zipcodetobarcodeTrans {
    // constructor(){}

    run(zipcode){
        return this.zipCodeToBarCode(zipcode);
    }
    //#1
    zipCodeToBarCode(zipcode) {

        let flag = this.checkZipCodeFormate(zipcode);
        if (flag === true) {
            let finalbarcode = this.zipTransformBar(zipcode);
            return new coreResponse(finalbarcode);
        } else {
            return new coreResponse(false);
        }
    }

    //2.1
    _checklength(zipcode) {
        if (zipcode.length === 5 || zipcode.length === 9 || zipcode.length === 10) {
            return true;
        } else {
            return false;
        }
    }

    //2.2
    _checknumber(zipcode) {
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

    //2.3
    _checklocation(zipcode) {
        let local = zipcode.indexOf('-');
        if (local === 5 || local === -1) {
            return true;
        } else {
            return false;
        }
    }

    //2.4
    _checkletter(zipcode) {
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

    checkZipCodeFormate(zipcode) {
        if (this._checklength(zipcode) === true && this._checknumber(zipcode) === true
            &&this. _checklocation(zipcode) === true && this._checkletter(zipcode) === true) {

            return true;
        } else {
            return false;
        }
    }

    // #3
    zipTransformBar(zipcode) {
        let testedzipcodes = _.chain(zipcode).split('').filter(element => {
            return element !== '-'
        }).value();

        let formatedzipcodes = this.getFormatedZipCode(testedzipcodes);

        // let AllItems = loadAllItems();
        let matchedbarcodes = this.matchByTableBarcode(formatedzipcodes, loadAllItems());

        let finalbarcodes = this.addExtraForm(matchedbarcodes);
        return finalbarcodes;
    }

    // #3.1
    getFormatedZipCode(testedzipcodes) {
        let checkCd = 10 - _.reduce(testedzipcodes, (firstcd, element) => {
                return firstcd += _.parseInt(element)
            }, 0) % 10;
        if (checkCd === 10) {
            checkCd = 0
        }
        let formatedzipcodes = _.flattenDeep([testedzipcodes, _.toString(checkCd)]);
        ;
        return formatedzipcodes;
    }

    // #3.2
    matchByTableBarcode(formatedzipcodes, AllItems) {
        let matchedBarcodes = _.map(formatedzipcodes, (element) => {
            let zipcode = _.find(AllItems, (code) => {
                return code.barcode === element;
            });
            return zipcode.zipcode;
        });
        return matchedBarcodes;
    }

    //#3.3
    addExtraForm(matchedbarcodes) {
        let precode = _.flatten(['|', matchedbarcodes, '|']);
        let finalbarcodes = precode.join('');
        return finalbarcodes;
    }

}

module.exports = zipcodetobarcodeTrans;


