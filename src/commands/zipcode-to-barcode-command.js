/**
 * Created by SONY on 2016/8/3.
 */
let BarToPost = require("../core/getposttobar-core");
let CommandResponse = require("./command-response");
let bartopost = new BarToPost();
class ZipcodeToBarcode {
    do(input) {
        let result = bartopost.do(input);
        if (result !== false) {
            return new CommandResponse({
                text: result,
                reset: true
            })
        } else {
            return new CommandResponse({
                error: "please give right input"
            })
        }
    }
}
module.exports = ZipcodeToBarcode;