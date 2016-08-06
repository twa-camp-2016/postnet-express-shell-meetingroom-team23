"use strict";

let GoToBarcodeCommand = require('./go-to-barcode-command');
let GoToZipcodeCommand = require('./go-to-zipcode-command');
let GoExitCommand = require('./go-exit-command');
let GoEvalInputCommand = require('./go-eval-input-command');
let CommandResponse = require('../src/command-response');

class GoToMainPageCommand {
    run() {
        return new CommandResponse({
            text: `1. Translate zip code to bar code\n2. Translate bar code to zip code\n3. Quit\nPlease input your choices(1~3)\n`,
            newMapping: {
                "1": new GoToZipcodeCommand(),
                "2": new GoToBarcodeCommand(),
                "3": new GoExitCommand(),
                "*": new GoEvalInputCommand()
            }
        })
    }
}

module.exports = GoToMainPageCommand;