/**
 * Created by SONY on 2016/8/3.
 */
let BarcodeToZipcode = require("./barcode-to-zipcode-command");
let barcodetozipcode = new BarcodeToZipcode();
let CommandResponse = require("./command-response");
class GotoBarcodeToZipcode {
    do() {
        return new CommandResponse({
            text: "please input bar code",
            newmapping: {
                "*": barcodetozipcode.do
            }
        });
    }
}
module.exports = GotoBarcodeToZipcode;