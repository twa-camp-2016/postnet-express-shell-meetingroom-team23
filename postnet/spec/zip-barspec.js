"use strict";
let _ = require("lodash");
let {
    transformBarCodeBetweenZipCode,
    checkZipCodeFormate,
    zipTransformBar,
    getFormatedZipCode,
    matchByTableBarcode,
    addExtraForm
} = require('../src/main.js');

let {loadAllItems} = require('../src/loadItems.js');

describe('barcode and zipcode', () => {
    it('#1', () => {
        let zipcode = "58347-1868";

        let testedZipcode = checkZipCodeFormate(zipcode);

        let expected = true;

        expect(testedZipcode).toEqual(expected);
    });

    // it('#1.0', ()=> {
    //     let zipcode = "12345-6789";
    //
    //     let testedZipcode = checkZipCodeFormate(zipcode);
    //
    //     let expected = "123456789";
    //
    //     expect(testedZipcode).toEqual(expected);
    // });
    // it('#1.1', () => {
    //     let zipcode = '95713';
    //
    //     let testedZipcode = checkZipCodeFormate(zipcode);
    //
    //     let expected = '95713';
    //
    //     expect(testedZipcode).toEqual(expected);
    // });
    //
    // it('#1.2', () => {
    //     let zipcode = '957136';
    //
    //     let testedZipcode = checkZipCodeFormate(zipcode);
    //
    //     let expected = false;
    //
    //     expect(testedZipcode).toEqual(expected);
    // });
    // it('#1.3', () => {
    //     let zipcode = '21345-3-31';
    //
    //     let testedZipcode = checkZipCodeFormate(zipcode);
    //
    //     let expected = false;
    //
    //     expect(testedZipcode).toEqual(expected);
    // });
    // it('#1.4', () => {
    //     let zipcode = '';
    //
    //     let testedZipcode = checkZipCodeFormate(zipcode);
    //
    //     let expected = false;
    //
    //     expect(testedZipcode).toEqual(expected);
    // });
    // it('#1.5', () => {
    //     let zipcode = '123123-231';
    //
    //     let testedZipcode = checkZipCodeFormate(zipcode);
    //
    //     let expected = false;
    //
    //     expect(testedZipcode).toEqual(expected);
    // });
    // it('#1.6', () => {
    //     let zipcode = '123a5';
    //
    //     let testedZipcode = checkZipCodeFormate(zipcode);
    //
    //     let expected = false;
    //
    //     expect(testedZipcode).toEqual(expected);
    // });

    it('#3', ()=> {

        let testedzipcodes = ['9', '5', '7', '1', '3'];

        let formatedzipcodes = getFormatedZipCode(testedzipcodes);

        let expected = ['9', '5', '7', '1', '3', '5'];

        expect(formatedzipcodes).toEqual(expected);
    });

    it('#4', () => {
        let formatedzipcodes = ['9', '5', '7', '1', '3', '5'];

        let AllItems = loadAllItems();
        let matchedbarcodes = matchByTableBarcode(formatedzipcodes, AllItems);

        let expected = ['|:|::', ':|:|:', '|:::|', ':::||', '::||:', ':|:|:'];

        expect(matchedbarcodes).toEqual(expected);
    });
    it("#5", () => {
        let matchedbarcodes = ['|:|::', ':|:|:', '|:::|', ':::||', '::||:', ':|:|:'];

        let finalbarcodes = addExtraForm(matchedbarcodes);

        let expected = '||:|:::|:|:|:::|:::||::||::|:|:|';

        expect(finalbarcodes).toEqual(expected);
    });

    it('#2', ()=> {
        let zipcode = '12345';

        let finalbarcode = zipTransformBar(zipcode);

        // let expected = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|';
        let expected = '|:::||::|:|::||::|::|:|:|::|:|:|';

        expect(finalbarcode).toEqual(expected);
    });
});
