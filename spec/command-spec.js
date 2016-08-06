"use strict";

let GoToMainPageCommand = require('../commands/go-to-main-page-command');
let GoToBarcodeCommand = require('../commands/go-to-barcode-command');
let GoToZipcodeCommand = require('../commands/go-to-zipcode-command');
let GoEvalInputCommand = require('../commands/go-eval-input-command');


describe('commands spec', ()=> {
    it('go to main pag command', ()=> {
        let goToMainPageCommand = new GoToMainPageCommand();
        let expected = `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
        expect(goToMainPageCommand.run().text).toEqual(expected);
    });
    it('go to zipcode command',()=>{
        let goToZipcodeCommand = new GoToZipcodeCommand();
        let expected = `please input zip code:`;
        expect(goToZipcodeCommand.run().text).toEqual(expected);
    });
    it('go to barcode command',()=>{
        let goToBarcodeCommand = new GoToBarcodeCommand();
        let expected = `please input bar code`;
        expect(goToBarcodeCommand.run().text).toEqual(expected);
    });
    it('go to eval input command',()=>{
        let goEvalInputCommand = new GoEvalInputCommand();
        let expected = `please give right input`;
        expect(goEvalInputCommand.run().error).toEqual(expected);
    });
});