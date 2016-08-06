let GoToMainPage = require('../src/command/go-to-main-page-command');
let GoToZipcodeToBarcode = require('../src/command/go-to-zipcode-to-barcode-command');
let GoToBarcodeToZipcode = require('../src/command/go-to-barcode-to-zipcode-command');
let Error  = require('../src/command/error-command');

describe('posnet-interaction',() => {
    it('goToMainPage',() => {
        let gotomainpage = new GoToMainPage().go().text;
        let expectString = `
1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;
        expect(gotomainpage).toEqual(expectString);
    });
    it('goToZipcodeToBarcode',() => {
        let gotozipcodetobarcode = new GoToZipcodeToBarcode().go().text;
        let expectString = 'Please input zip code:';
        expect(gotozipcodetobarcode).toEqual(expectString);
    });
    it('goToBarcodeToZipcode',() => {
        let gotobarcodetozipcode = new GoToBarcodeToZipcode().go().text;
        let expectString = 'Please input bar code:';
        expect(gotobarcodetozipcode).toEqual(expectString);
    });
    it('error',() => {
        let error = new Error().error().error;
        let expectString = 'Please give right input';
        expect(error).toEqual(expectString);
    });
});
