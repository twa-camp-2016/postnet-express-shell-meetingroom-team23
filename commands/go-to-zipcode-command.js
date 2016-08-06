"use strict";

let ZipcodeToBarcodeCommand = require('./zipcode-to-barcode-command');
let CommandResponse = require('../src/command-response');

class GoToZipcodeCommand {
    run(){
        return new CommandResponse({
            text:`please input zip code:`,
            newMapping:{"*":new ZipcodeToBarcodeCommand()}
        })
    }
}

module.exports = GoToZipcodeCommand;