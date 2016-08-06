"use strict";

let BarcodeToZipcode = require('../src/barocde-to-zipcode');
let CommandResponse = require('../src/command-response');

let barcodeToZipcode = new BarcodeToZipcode();


class BarcodeToZipcodeCommand {
    run(input) {
        let zipCode = barcodeToZipcode.barcodeToZipCode(input);
        if(zipCode.type === false){
            return new CommandResponse({
                error:`please give right input:`
            })
        }else{
            return new CommandResponse({
                text:zipCode.text,
                reset:true
            })
        }
    }
}

module.exports = BarcodeToZipcodeCommand;


