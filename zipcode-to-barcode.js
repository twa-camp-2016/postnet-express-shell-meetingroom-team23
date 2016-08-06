'use strict';
const _ = require('lodash');
const loadAllCodes = require('../main/load-all-codes');

class ZipcodeToBarcodeResponse {
    constructor({text}) {
        this.text = text;
    }
}
class TranslateZipcodeToBarcode {
    translate(zipcode) {
        const result = checkZipcode.check(zipcode);

        if (result.text) {
            const splittedZipcode = getSplittedZipcode.get(zipcode);
            const checkDigit = getCheckDigit.get(splittedZipcode.text);
            const allCodes = loadAllCodes();
            const barcode = getBarcode.get(checkDigit.text, allCodes);
            return new ZipcodeToBarcodeResponse({text: barcode.text});
        } else return new ZipcodeToBarcodeResponse({text: false});
    }
}

class CheckZipcode {
    check(zipcode) {
        let splittedZipcode = _.split(zipcode, '');
        let length = checkLength.check(splittedZipcode);
        let dashCount = checkDashCount.check(splittedZipcode);
        let dashLocation = checkDashLocation.check(splittedZipcode);
        let number = checkPureNumber.check(splittedZipcode);

        return new ZipcodeToBarcodeResponse({text: length.text && dashCount.text && dashLocation.text && number.text});
    }
}

class CheckLength {
    check(splittedZipcode) {
        let length = splittedZipcode.length;

        return new ZipcodeToBarcodeResponse({text: length === 5 || length === 9 || length === 10});
    }
}

class CheckDashCount {
    check(splittedZipcode) {
        let count = 0;
        for (let code of splittedZipcode) {
            if (code === '-') {
                count++;
            }
        }
        return new ZipcodeToBarcodeResponse({text: count <= 1});
    }
}

class CheckDashLocation {
    check(splittedZipcode) {
        if (splittedZipcode.length === 10) {
            let location = _.indexOf(splittedZipcode, '-');
            return new ZipcodeToBarcodeResponse({text: location === 5});
        } else return new ZipcodeToBarcodeResponse({text: true});
    }
}

class CheckPureNumber {
    check(splittedZipcode) {
        for (let code of splittedZipcode) {
            if (typeof  parseInt(code) === "number" || code === '-') {
                return new ZipcodeToBarcodeResponse({text: true});
            } else return new ZipcodeToBarcodeResponse({text: false});
        }
    }
}

class GetSplittedZipcode {
    get(zipcode) {
        if (zipcode.length === 5 || zipcode.length === 9) {
            return new ZipcodeToBarcodeResponse({text: _.chain(zipcode).split('').map(x => parseInt(x)).value()});
        } else {
            return new ZipcodeToBarcodeResponse({text: _.chain(zipcode).split('-').join('').split('').map(x => parseInt(x)).value()});
        }
    }
}

class GetCheckDigit {
    get(splittedZipcode) {
        let sum = _.reduce(splittedZipcode, (prev, curr) => prev + curr, 0);
        let digit = sum % 10;
        splittedZipcode.push(digit);
        return new ZipcodeToBarcodeResponse({text: splittedZipcode});
    }
}

class GetBarcode {
    get(checkDigit, allCodes) {
        let code = _.map(checkDigit, x => allCodes[x]).join('');
        return new ZipcodeToBarcodeResponse({text: `|${code}|`});
    }
}

const checkZipcode = new CheckZipcode();
const checkLength = new CheckLength();
const checkDashCount = new CheckDashCount();
const checkDashLocation = new CheckDashLocation();
const checkPureNumber = new CheckPureNumber();
const getSplittedZipcode = new GetSplittedZipcode();
const getCheckDigit = new GetCheckDigit();
const getBarcode = new GetBarcode();
module.exports = {
    TranslateZipcodeToBarcode
};