let barcodetozipcodeTrans = require('../src/barcodetozipcodeTrans');
let coreResponse = require('../src/coreResponse');

let translater = new barcodetozipcodeTrans();
// console.log(translater.run('|:::||::|:|::||::|::|:|:|::|:|:|'));

describe('class text',() => {
    it('#1 rightone', () =>{
        let barcodes = '|:::||::|:|::||::|::|:|:|::|:|:|';
        let expected = new coreResponse('12345');
        console.log(translater.run(barcodes));
        expect(translater.run(barcodes)).toEqual(expected);
    });

    it('#2,wrongone', () =>{
        let barcodes ='|||||||:::||';
        let expected = new coreResponse(false);
        expect(translater.run(barcodes)).toEqual(expected);
    });

});