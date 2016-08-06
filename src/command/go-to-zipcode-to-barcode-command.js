let CommandResponse = require('./response-command');
let ZipcodeToBarcode = require('./zipcode-to-barcode-command');
let ziptobarcode = new ZipcodeToBarcode();
class GoToZipcodeToBarcode {
    go() {
        return new CommandResponse({
            text: 'Please input zip code:',
            newMapping: {
                "*": ziptobarcode.translate
            }
        })
    }
}
module.exports = GoToZipcodeToBarcode;
