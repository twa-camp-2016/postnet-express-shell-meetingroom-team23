let classBarcodeToZipcodeCmd = require('./barcode-to-zipcode');
let barcodeToZipcodeCmd = new classBarcodeToZipcodeCmd();

let CommandResponse = require('./command-response');

class GoBarcodeToZipcodeCmd {
    go() {
        return new CommandResponse({
            text: 'Please input bar code:',
            newMapping: {
                '*': barcodeToZipcodeCmd.translate
            }
        });
    }
}

module.exports = GoBarcodeToZipcodeCmd;
