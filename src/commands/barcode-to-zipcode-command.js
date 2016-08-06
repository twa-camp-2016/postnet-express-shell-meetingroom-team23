/**
 * Created by SONY on 2016/8/3.
 */
let PostToBar = require("../core/getposttobar-core");
let CommandResponse = require("./command-response");
let posttobar = new PostToBar();
class BarcodeToZipcode {
    do(input) {
        let result = posttobar.do(input);
        if (result !== false) {
            return new CommandResponse({
                text: result,
                reset: true
            });
        } else {
            return  new CommandResponse({
                error: "please give right input"
            });
        }
    }
}

module.exports = BarcodeToZipcode;