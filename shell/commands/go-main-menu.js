let classGoZipcodetoBarcodeCmd = require('./go-zipcode-to-barcode');
let commandZipcodeToBarcode = new classGoZipcodetoBarcodeCmd();

let classGoBarcodeToZipcodeCmd = require('./go-barcode-to-zipcode');
let commandBarcodeToZipcode = new classGoBarcodeToZipcodeCmd();

let classQuitCmd = require('./quit');
let commandQuit = new classQuitCmd();

let classErrorCmd = require('./error-input');
let commandErrorInput = new classErrorCmd();

let CommandResponse = require('./command-response');

class GoMainMenuCmd {

    go(){
        return new CommandResponse({
            text: `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`,
            newMapping: {
                '1': commandZipcodeToBarcode.go,
                '2': commandBarcodeToZipcode.go,
                '3': commandQuit.go,
                '*': commandErrorInput.go
            }
        });
    }
}

module.exports = GoMainMenuCmd;
