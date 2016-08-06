"use strict";
let CommandResponse = require('../src/command-response');

class GoEvalInputCommand {
    run() {
        return new CommandResponse({
            error:`please give right input`
        })
    }
}

module.exports = GoEvalInputCommand;