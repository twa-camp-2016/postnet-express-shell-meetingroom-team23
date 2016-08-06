"use strict";

let BarcodeToZipcodeCommand = require('./barcode-to-zipcode-command');
let CommandResponse = require('../src/command-response');

// let barcodeToZipcodeCommand = new BarcodeToZipcodeCommand();

class GoToBarcodeCommand {
    run(){
        return new CommandResponse({
           text:`please input bar code`,
            newMapping:{
               "*":new BarcodeToZipcodeCommand()
            }
        });
        // return {
        //     text:`please input bar code`,
        //     newMapping:{
        //         // "*":barcodeToZipcodeCommand.run
        //         "*":new BarcodeToZipcodeCommand().run
        //     }
        // }
    }
}

module.exports = GoToBarcodeCommand;