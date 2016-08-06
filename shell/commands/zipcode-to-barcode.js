let classBestCharge = require('../../core/best-charge');
let bestcharge = new classBestCharge();
let zipcodeChangeToBarcode = bestcharge.zipcodeChangeToBarcode;

let CommandResponse = require('./command-response');

class ZipcodeToBarcodeCmd {
    translate(zipcode){
        let barcode = zipcodeChangeToBarcode(zipcode);

        if (barcode === false) {
            return new CommandResponse({
                error: 'Please give right input:'
            });
        } else {
            return new CommandResponse({
                text: barcode,
                reset: true
            });
        }
    }
}

module.exports = ZipcodeToBarcodeCmd;
