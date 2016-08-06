"use strict";

let ZipcodeToBarcode = require('../src/zipcode-to-barcode');
let CommandResponse = require('../src/command-response');

let zipcodeToBarcode = new ZipcodeToBarcode();

class ZipcodeToBarcodeCommand {
    run(input) {
        let barcode = zipcodeToBarcode.zipCodeToBarcode(input);
        if (barcode.type === false) {
            return new CommandResponse({
                error:`please give right input:`
            })
        } else {
            return new CommandResponse({
                text:barcode.text,
                reset:true
            })
        }
    }
}
module.exports = ZipcodeToBarcodeCommand;