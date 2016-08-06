let {PostcodeToBarcode,BarcodeToPostcode}= require('../src/codeTransform')
describe('postcodeTobarcode text',()=>{
    it('#postcodeTobarcode text',()=>{
        let postcode='12345';
        let  trans =new PostcodeToBarcode();
        let barcode = trans.postcodeString(postcode)
        let expected = '|:::||::|:|::||::|::|:|:|::|:|:|';
        expect(barcode).toEqual(expected);
    })
    });
describe('barcodeToPostcode text',()=>{
    it('#barcodeToPostcode text',()=>{
        let barcode='|:::||::|:|::||::|::|:|:|::|:|:|';
        let  tran = new BarcodeToPostcode();
        let postcode = tran.barcodeString(barcode);
        let expected = '12345';
        expect(postcode).toEqual(expected);
    })
    });