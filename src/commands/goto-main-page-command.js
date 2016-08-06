/**
 * Created by SONY on 2016/8/3.
 */
let GotoZipcodeToBarcode = require("./goto-zipcode-to-barcode-command");
let GotoBarcodeToZipcode = require("./goto-barcode-to-zipcode-command");
let Exit = require("./exit-command")
let InvalidInput = require("./invalid-input-command");
let gotozipcodetobarcode = new GotoZipcodeToBarcode();
let gotobarcodetozipcode = new GotoBarcodeToZipcode();
let exit = new Exit();
let invalidinput = new InvalidInput();
class GotoMainPage{
    do(){
        return {
            text: `1.translate zip code to bar code
2.translate bar code to zip code
3.Quit
please input your choice(1-3)`,
            newmapping:{
                "1": gotozipcodetobarcode.do,
                "2": gotobarcodetozipcode.do,
                "3": exit.do,
                "*": invalidinput.do
            }
        }
    }
}
module.exports = GotoMainPage;