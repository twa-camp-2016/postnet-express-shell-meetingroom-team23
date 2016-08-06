let CommandResponse = require('./response-command');
let BarcodeToZipCode = require('./barcode-to-zipcode-command');
let barcodetozipcode = new BarcodeToZipCode();
class GoToBarcodeToZipcode {
    go() {
        return new CommandResponse({
            text: 'Please input bar code:',
            newMapping: {
                "*": barcodetozipcode.translate
            }
        })
    }
}
module.exports = GoToBarcodeToZipcode;
