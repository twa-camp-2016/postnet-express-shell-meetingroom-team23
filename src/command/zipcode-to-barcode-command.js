let  CommandResponse = require('./response-command');
let zipcodetobarcode = require('../../src/core-zipcode-to-barcode.js');
let ziptobar = new zipcodetobarcode();
let tobarcode = ziptobar.go;
class ZipcodeToBarcode {
    translate(zipcode) {
        let barcode = tobarcode(zipcode);
        if (barcode.type === false) {
            return new CommandResponse({
                text: 'Please give right input',
            })
        } else {
            return new CommandResponse({
                text: barcode,
                reset: true
            })
        }
    }
}
module.exports = ZipcodeToBarcode;