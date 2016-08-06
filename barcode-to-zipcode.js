'use strict';
let _ = require('lodash');
const loadAllCodes = require('../main/load-all-codes');

class BarcodeToZipcodeResponse {
    constructor({text}) {
        this.text = text;
    }
}

class TranslateBarcodeToZipcode {
    translate(barcode) {
        let allCodes = loadAllCodes();

        let result = checkBarcode.check(barcode, allCodes);

        if (result.text) {
            let silicedBarcode = getSlicedBarcode.get(barcode, allCodes);
            let zipcode = getZipcode.get(silicedBarcode.text);
            return new BarcodeToZipcodeResponse({text: zipcode.text});
        } else {
            return new BarcodeToZipcodeResponse({text: false});
        }
    }
}

class CheckBarcode {
    check(barcode, allCodes) {
        let chunckedBarcode = getChunckedBarcode.get(barcode);
        let checkDigit = getCheckDigit.get(chunckedBarcode.text, allCodes);
        let checkNumbers = getCheckNumbers.get(chunckedBarcode.text, allCodes);
        let checkCount = getCheckCount.get(barcode);
        return new BarcodeToZipcodeResponse({text: checkDigit.text && checkNumbers.text && checkCount.text});
    }
}

class GetChunckedBarcode {
    get(barcode) {
        let slicedBarcode = _.slice(barcode, 1, -1);
        return new BarcodeToZipcodeResponse({text: _.chunk(slicedBarcode, 5).map(x => x.join(''))});
    }
}

class GetCheckDigit {
    get(chunckedBarcode, allCodes) {
        let array = _.map(chunckedBarcode, str => allCodes.indexOf(str));
        let checkDigit = _.last(array);
        let checkArray = _.dropRight(array);
        let realCheckDigit = _.reduce(checkArray, (sum, x) => sum + x, 0) % 10;

        return new BarcodeToZipcodeResponse({text: realCheckDigit === checkDigit});
    }
}

class GetCheckNumbers {
    get(chunckedBarcode, allCodes) {
        let array = _.map(chunckedBarcode, str => allCodes.indexOf(str));
        let isExist = _.find(array, x => x === -1);
        return new BarcodeToZipcodeResponse({text: isExist === undefined});
    }
}

class GetCheckCount {
    get(barcode) {
        return new BarcodeToZipcodeResponse({text: (barcode.length === 32 || barcode.length === 52)});
    }
}

class GetSlicedBarcode {
    get(barcode, allCodes) {
        let chunckedBarcode = getChunckedBarcode.get(barcode);
        let result = _.map(chunckedBarcode.text, str => allCodes.indexOf(str));
        return new BarcodeToZipcodeResponse({text: result});
    }
}

class GetZipcode {
    get(silicedBarcode) {
        let dropedBarcode = _.dropRight(silicedBarcode);
        if (dropedBarcode.length === 9) {
            return new BarcodeToZipcodeResponse({text: `${_.slice(dropedBarcode, 0, 5).join('')}-${_.slice(dropedBarcode, 5).join('')}`});
        }
        else return new BarcodeToZipcodeResponse({text: dropedBarcode.join('')});
    }
}


const checkBarcode = new CheckBarcode();
const getSlicedBarcode = new GetSlicedBarcode();
const getZipcode = new GetZipcode();
const getCheckDigit = new GetCheckDigit();
const getCheckNumbers = new GetCheckNumbers();
const getCheckCount = new GetCheckCount();
const getChunckedBarcode = new GetChunckedBarcode();

module.exports = {
    TranslateBarcodeToZipcode
};