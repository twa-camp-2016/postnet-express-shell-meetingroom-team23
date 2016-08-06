let CommandResponse = require('./response-command');
let barcodetozipcode = require('../../src/core-barcode-to-zipcode.js');
let bartozip = new barcodetozipcode;
let tozipcode = bartozip.go;
class BarcodeToZipCode {
    translate(barcode) {
        let zipcode = tozipcode(barcode)
        if (zipcode.type === false) {
            return new CommandResponse({text:'Please give right input'});
        } else {
            return new CommandResponse({text:zipcode,reset:true});
        }
    }
}
module.exports = BarcodeToZipCode;