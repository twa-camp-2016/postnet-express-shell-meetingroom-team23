let commandBarcodeToZipcode = require('../commands/goto-barcode-to-zipcode-page');
let commandZipcodeToBarcode = require('../commands/goto-zipcode-to-barcode-page');
let commandExit = require('../commands/exit');
let commandInvalidInput = require('../commands/invalid-input');

// module.exports = function () {
//     return {
//         text:
//             '|1. Translate zip code to bar code \n|2. Translate bar code to zip code \n|3. Quit+ |Please input your choices(1~3)',
//         newMapping: {
//             "1": commandZipcodeToBarcode,
//             "2": commandBarcodeToZipcode,
//             "3": commandExit,
//             "*": commandInvalidInput
//         }
//     }
// };
let CommandRespose = require('../CommandResponse');
class GotoMainPage{
    run(){
        return new CommandRespose({
            text:
                '|1. Translate zip code to bar code \n|2. Translate bar code to zip code \n|3. Quit+ |Please input your choices(1~3)',
            newMapping: {
                "1": new commandZipcodeToBarcode(),
                "2": new commandBarcodeToZipcode(),
                "3": new commandExit(),
                "*": new commandInvalidInput()
            }
        });
    }
}

module.exports = GotoMainPage;
