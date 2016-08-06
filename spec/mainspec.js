//noinspection JSValidateTypes
/*global require*/
let {
    ZipcodeToBarcodeMain,
    ZipcodeToBarcodeRealize,
    ZipcodeToBarcode,
    BarcodeToZipcodeMain,
    BarcodeToZipcodeRealize,
    BarcodeToZipcode
}= require('../src/main');

let {loadAllItems}=require('../src/items');

describe('getBarcode unit test', function () {
    let zipcodeToBarcode = new ZipcodeToBarcodeMain();
    it('getFormatedZipcode_1', function () {
        let zipcode = '12345';
        let formatedZipcode = '12345';
        let result = zipcodeToBarcode.getFormatedZipcode(zipcode);
        expect(formatedZipcode).toEqual(result);
    });

    it('getFormatedZipcode_2', function () {
        let zipcode = '12345-6789';
        let formatedZipcode = '123456789';
        let result = zipcodeToBarcode.getFormatedZipcode(zipcode);
        expect(formatedZipcode).toEqual(result);
    });

    it('getFormatedZipcode_3', function () {
        let zipcode = '123456789';
        let formatedZipcode = '123456789';
        let result = zipcodeToBarcode.getFormatedZipcode(zipcode);
        expect(formatedZipcode).toEqual(result);
    });

    it('getArrayZipcode', function () {
        let formatedZipcode = '123456789';
        let arrayZipcode = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let result = zipcodeToBarcode.getArrayZipcode(formatedZipcode);
        expect(arrayZipcode).toEqual(result);
    });

    it('getCheckNumber', function () {
        let arrayZipcode = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let checkNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
        let result = zipcodeToBarcode.getCheckNumber(arrayZipcode);
        expect(checkNumber).toEqual(result);
    });

    it('getBarcode', function () {
        let checkNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
        let allItems = loadAllItems();
        let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        let result = zipcodeToBarcode.getBarcode(allItems, checkNumber);
        expect(barcode).toEqual(result);
    });
});

describe('buildBarcode test', function () {
    let zipcodeToBarcodeRealize = new ZipcodeToBarcodeRealize();
    it('buildBarcode_1', function () {
        let zipcode = '12345-6789';
        let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        let result = zipcodeToBarcodeRealize.buildBarcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildBarcode_2', function () {
        let zipcode = '12345';
        let barcode = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let result = zipcodeToBarcodeRealize.buildBarcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildBarcode_3', function () {
        let zipcode = '123456789';
        let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        let result = zipcodeToBarcodeRealize.buildBarcode(zipcode);
        expect(barcode).toEqual(result);
    });
});

describe('getZipcode unit test', function () {
    let barcodeToZipcodeMain = new BarcodeToZipcodeMain();
    it('getFormtedBarcode', function () {
        let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        let formatedBarcode = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
        let result = barcodeToZipcodeMain.getFormatedBarcode(barcode);
        expect(formatedBarcode).toEqual(result);
    });

    it('getZipcodeArray', function () {
        let formatedBarcode = [':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
        let arrayZipcode = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let allItems = loadAllItems();
        let result = barcodeToZipcodeMain.getZipcodeArray(allItems, formatedBarcode);
        expect(arrayZipcode).toEqual(result);
    });

    it('getZipcode', function () {
        let arrayZipcode = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let zipcode = '12345-6789';
        let result = barcodeToZipcodeMain.getZipcode(arrayZipcode);
        expect(zipcode).toEqual(result);
    });

    it('getZipcode', function () {
        let arrayZipcode = [1, 2, 3, 4, 5];
        let zipcode = '12345';
        let result = barcodeToZipcodeMain.getZipcode(arrayZipcode);
        expect(zipcode).toEqual(result);
    });
});

describe('buildZipcode test', function () {
    let barcodeToZipcodeRealize = new BarcodeToZipcodeRealize();
    it('buildZipcode_1', function () {
        let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
        let zipcode = '12345-6789';
        let result = barcodeToZipcodeRealize.buildZipcode(barcode);
        expect(zipcode).toEqual(result);
    });

    it('buildZipcode_2', function () {
        let zipcode = '12345';
        let barcode = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let result = barcodeToZipcodeRealize.buildZipcode(barcode);
        expect(zipcode).toEqual(result);
    });
});

describe('buildJudgeExecuteZipcode test', function () {
    let zipcodeToBarcode = new ZipcodeToBarcode();
    it('buildJudgeExecute_1', function () {
        let zipcode = '74310';
        let barcode = '||:::|:|::|::||::::||||::::|:|:|';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_2.1', function () {
        let zipcode = '201438912';
        let barcode = '|::|:|||::::::||:|::|::||:|::|:|:|:::::||::|:|||:::|';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });


    it('buildJudgeExecute_3.3', function () {
        let zipcode = '2014378912';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_2.1', function () {
        let zipcode = '8912';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_2.1', function () {
        let zipcode = '8914572';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_3.1.1.1', function () {
        let zipcode = '20143-8912';
        let barcode = '|::|:|||::::::||:|::|::||:|::|:|:|:::::||::|:|||:::|';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_3.2', function () {
        let zipcode = '20143-8-12';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_3.1.2', function () {
        let zipcode = '2014-38912';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_2.2', function () {
        let zipcode = '2014#8912';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_1.1', function () {
        let zipcode = '74a10';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_3.1.1.2', function () {
        let zipcode = '20143-89a2';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    it('buildJudgeExecute_3.1.1.2.1', function () {
        let zipcode = '201s3-89a2';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });

    fit('buildJudgeExecute_3.1.1.2.1', function () {
        let zipcode = '***';
        let barcode = 'please enter the correct zipcode!';
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);
        expect(barcode).toEqual(result);
    });
});

describe('barcodeToZipcode.buildJudgeExecuteBarcode test', function () {
    let barcodeToZipcode = new BarcodeToZipcode();
    it('buildJudgeExecuteZipcode', function () {
        let zipcode = '74310';
        let barcode = '||:::|:|::|::||::::||||::::|:|:|';
        let result = barcodeToZipcode.buildJudgeExecuteBarcode(barcode);
        expect(zipcode).toEqual(result);
    });

    it('buildJudgeExecuteZipcode_1', function () {
        let zipcode = '20143-8912';
        let barcode = '|::|:|||::::::||:|::|::||:|::|:|:|:::::||::|:|||:::|';
        let result = barcodeToZipcode.buildJudgeExecuteBarcode(barcode);
        expect(zipcode).toEqual(result);
    });

    it('buildJudgeExecuteZipcode_1', function () {
        let zipcode = 'please enter the correct barcode!';
        let barcode = '::|:|||::::::||:|::|::||:|::|:|:|:::::||::|:|||:::|';
        let result = barcodeToZipcode.buildJudgeExecuteBarcode(barcode);
        expect(zipcode).toEqual(result);
    });

    it('buildJudgeExecuteZipcode_1', function () {
        let zipcode = 'please enter the correct barcode!';
        let barcode = '|::|||||::::::||:|::|::||:|::|:|:|:::::||::|:|||:::|';
        let result = barcodeToZipcode.buildJudgeExecuteBarcode(barcode);
        expect(zipcode).toEqual(result);
    });

    it('buildJudgeExecuteZipcode_1', function () {
        let zipcode = 'please enter the correct barcode!';
        let barcode = '|::|:|||::::::||:|::|::||:|::|:|:|:::::||::|:||::|:|';
        let result = barcodeToZipcode.buildJudgeExecuteBarcode(barcode);
        expect(zipcode).toEqual(result);
    });
});