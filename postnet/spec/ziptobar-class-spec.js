let zipcodetobarcodeTrans = require('../src/zipcodetobarcodeTrans');
let coreResponse = require('../src/coreResponse');

let translater = new zipcodetobarcodeTrans();

describe('class text',() =>{
    it('#1 rightone', () =>{
        let zipcode = '12345';
        let expected = new coreResponse('|:::||::|:|::||::|::|:|:|::|:|:|');
        expect(translater.run(zipcode)).toEqual(expected);
    });
    it('#2,wrongone', () =>{
        let zipcode ='1235';
        let expected = new coreResponse(false);
        expect(translater.run(zipcode)).toEqual(expected);
    });
});

