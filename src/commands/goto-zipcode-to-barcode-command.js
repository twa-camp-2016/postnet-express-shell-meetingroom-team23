/**
 * Created by SONY on 2016/8/3.
 */
let ZipcodeToBarcode = require("./zipcode-to-barcode-command")
let zipcodetobarcode = new ZipcodeToBarcode();
let CommandResponse = require("./command-response");
class GotoZipcodeToBarcode {
    do() {
        return new CommandResponse({
            text: "please input zip code",
            newmapping: {
                "*": zipcodetobarcode.do
            }
        });
    }
}
module.exports = GotoZipcodeToBarcode;