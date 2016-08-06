let classBestCharge = require('../../core/best-charge');
let bestcharge = new classBestCharge();
let barcodeChangeToZipcode = bestcharge.barcodeChangeToZipcode;

let CommandResponse = require('./command-response');

class BarcodeToZipcodeCmd {
    translate(barcode){
        let zipcode = barcodeChangeToZipcode(barcode);

        if (zipcode === false) {
            return new CommandResponse({
                error: 'Please give right input:'
            });
        } else {
            return new CommandResponse({
                text: zipcode,
                reset: true
            });
        }

    }
}
module.exports = BarcodeToZipcodeCmd;