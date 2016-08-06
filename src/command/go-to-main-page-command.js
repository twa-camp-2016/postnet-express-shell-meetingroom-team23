let CommandResponse = require('./response-command');
let GoToZipcodeToBarcode = require('./go-to-zipcode-to-barcode-command');
let gotozipcodetobarcode = new GoToZipcodeToBarcode();
let GoToBarcodeToZipcode = require('./go-to-barcode-to-zipcode-command');
let gotobarcodetozipcode = new GoToBarcodeToZipcode();
let Exit = require('./exit-command');
let exit = new Exit();
let Error = require('./error-command');
let error = new Error();

class GoToMainPage {
    go() {
        return new CommandResponse( {
            text: `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`,
            newMapping: {
                "1": gotozipcodetobarcode.go,
                "2": gotobarcodetozipcode.go,
                "3": exit.exit,
                "*": error.error
            }
        })
    }
}
module.exports = GoToMainPage;
