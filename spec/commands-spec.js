/**
 * Created by SONY on 2016/8/4.
 */
let gotomainpagecommand = require("../src/commands/goto-main-page-command");
let gotobarcodetozipcode = require("../src/commands/goto-barcode-to-zipcode-command");
let gotozipcodetobarcode = require("../src/commands/goto-zipcode-to-barcode-command");
let barcodetozipcode = require("../src/commands/barcode-to-zipcode-command");
let zipcodetobarcode = require("../src/commands/zipcode-to-barcode-command");
describe("commands test",()=>{
    it("#1.goto-main-page",()=>{
        let output = new gotomainpagecommand().do().text;
        let expected =  `1.translate zip code to bar code
2.translate bar code to zip code
3.Quit
please input your choice(1-3)`;
        expect(output).toEqual(expected);
    });
    it("#2.goto-barcode-to-zipcode",()=>{
        let output = new gotobarcodetozipcode().do().text;
        let expected = "please input bar code";
        expect(output).toEqual(expected);
    });
    it("#3.goto-zipcode-to-barcode",()=>{
        let output = new gotozipcodetobarcode().do().text;
        let expected = "please input zip code";
        expect(output).toEqual(expected);
    });
    it("#4.barcode-to-zipcode",()=>{
        let output = new barcodetozipcode().do("12345").text;
        let expected = "|:::||::|:|::||::|::|:|:|::|:|:|";
        expect(output).toEqual(expected);
    });
    it("#4.barcode-to-zipcode-error",()=>{
        let output = new barcodetozipcode().do("123").error;
        let expected ="please give right input";
        expect(output).toEqual(expected);
    });
    it("#4.barcode-to-zipcode",()=>{
        let output = new barcodetozipcode().do("12345").text;
        let expected = "|:::||::|:|::||::|::|:|:|::|:|:|";
        expect(output).toEqual(expected);
    });
    it("#4.barcode-to-zipcode-error",()=>{
        let output = new barcodetozipcode().do("123").error;
        let expected ="please give right input";
        expect(output).toEqual(expected);
    });
    it("#5.zipcode-to-barcode-error",()=>{
        let output = new zipcodetobarcode().do("|:::||::|:|::||").error;
        let expected ="please give right input";
        expect(output).toEqual(expected);
    })
})