'use strict';

let _ = require('lodash');
let allCodes = require('../src/loadAllcodes');
let {BuildBarCode} = require('../src/BarCodeClass');

class buildSplittedBarcode {

    buildSplittedBarcode(input) {

        let splittedInput = input.split('');
        let splittedBarcode = _(splittedInput).slice(1, splittedInput.length - 1).value();

        return new BuildBarCode({text: splittedBarcode});
    };
}

class checkBarcode {

    checkBarcode(splittedBarcode, allcodes) {

        let splittedBarcodes = _.chunk(splittedBarcode, 5);

        if ((splittedBarcodes.length === 6) || (splittedBarcodes.length === 10)) {
            let a = new checkBarcodeRight;
            let barcodes = a.checkBarcodeRight(splittedBarcodes, allcodes);

            if (barcodes !== 'invalid_barCode') {
                let a = new checkDigit;

                return new BuildBarCode({text: a.checkDigit(barcodes, allcodes)});
            }

            return new BuildBarCode({text: 'invalid_barCode'});
        }
        return new BuildBarCode({text: 'invalid_barCode'});
    }

}

class checkDigit {
    checkDigit(barcodes, allcodes) {

        const index = _.map(barcodes, barcode => allcodes.indexOf(barcode));

        return _(_(index).slice(0, -1).sum()) % 10 === index[index.length - 1] ? barcodes : 'invalid_barCode';
    }
}

class checkBarcodeRight {
    checkBarcodeRight(splittedBarcodes, allcodes) {

        let barcodes = splittedBarcodes.map(n => n.join(''));

        return new BuildBarCode({text: barcodes.map(n => allcodes.includes(n))}) ? barcodes : new BuildBarCode({text: 'invalid_barCode'});
    }
}

class buildZipcode {
    buildZipcode(barcodes, allcodes) {

        const barcode = _.chain(barcodes.text).chunk(5).value();
        const index = _.map(barcodes.text, barcode => allcodes.indexOf(barcode));

        return new BuildBarCode({text: index.slice(0, index.length - 1).join('')});
    };
}


class changeBarcodeToZipcode {

    changeBarcodeToZipcode(input) {

        let a = new buildSplittedBarcode();
        let splittedBarcode = a.buildSplittedBarcode(input);

        let allcodes = allCodes();
        let b = new checkBarcode;
        let barcodes = new BuildBarCode({text: b.checkBarcode(splittedBarcode.text, allcodes)});

        if (barcodes.text.text !== 'invalid_barCode') {
            let c = new buildZipcode;
            return new BuildBarCode({text: c.buildZipcode(barcodes.text, allcodes)});
        }

        return new BuildBarCode({text: 'invalid_barCode'});

    };
}

module.exports = {changeBarcodeToZipcode, buildSplittedBarcode, checkBarcode, buildZipcode};
