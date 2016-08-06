"use strict";
let {
    braCodeToZipCode:braCodeToZipCode,

    checkBarcodeFormate:checkBarcodeFormate,

    BarTransformBarZip:BarTransformBarZip,
    getFormatedBarcode: getFormatedBarcode,
    matchByTableZipcode: matchByTableZipcode,
    recheckFormate: recheckFormate,

} =require('../src/main.js');
let {loadAllItems} = require('../src/loadItems.js');

describe("barcode to zipcode", () => {
    it('#8', () => {
        let barcode = '|||::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        let a = checkBarcodeFormate(barcode);

        let expected = false;

        expect(a).toEqual(expected);
    });

    it('#8.0', () => {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        let a = checkBarcodeFormate(barcode);

        let expected = true;

        expect(a).toEqual(expected);
    });
    it('#8.1', () => {
        let barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';

        let a = checkBarcodeFormate(barcode);

        let expected = true;

        expect(a).toEqual(expected);
    });

    it('#9', () => {
        let testedBarcodes = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        let formatedBarcodes = getFormatedBarcode(testedBarcodes);

        let expected = [':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|', '||:::'];

        expect(formatedBarcodes).toEqual(expected);
    });

    it('#10', () => {
        let formatedBarcodes = [':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|', '||:::'];

        let AllItems = loadAllItems();
        let machedBarcodes = matchByTableZipcode(formatedBarcodes, AllItems);

        let expected = '450561234';

        expect(machedBarcodes).toEqual(expected);
    });

    it('#11', () => {
        let machedBarcodes = '450561234';

        let finalzipcodes = recheckFormate(machedBarcodes);

        let expected = '45056-1234';

        expect(finalzipcodes).toEqual(expected);
    });

    it('#6',() => {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        let flag = checkBarcodeFormate(barcode);

        let expected = true;

        expect(flag).toEqual(expected);
    });


    it('#7', () => {
        let barcode ='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        let testedzipcode = BarTransformBarZip(barcode);

        let expected = '45056-1234';

        expect(testedzipcode).toEqual(expected);
    });

});