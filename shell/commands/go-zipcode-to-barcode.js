let zipcodeToBarcodeCmd = require('./zipcode-to-barcode');
let zipcodeToBarcode = new zipcodeToBarcodeCmd();

let CommandResponse = require('./command-response');

class GoZipcodeToBarcodeCmd {
    go(){
        return new CommandResponse({
            text: 'Please input zip code:',
            newMapping: {
                '*': zipcodeToBarcode.translate
            }
        });
    }
}

module.exports = GoZipcodeToBarcodeCmd;
