/**
 * Created by SONY on 2016/8/3.
 */
let CommandResponse = require("./command-response");
class InvalidInput {
    do() {
        return new CommandResponse({
            error: "please give right input"
        });
    }
}

module.exports = InvalidInput;