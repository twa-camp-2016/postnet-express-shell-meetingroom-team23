let readlinesync = require('readline-sync');
let http = require('http');

function inputChoose() {
    let choose = readlinesync.question(`1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`);
    if (choose == 1) {
        let zipcode = readlinesync.question(`Please input zip code:`);
        console.log(zipcode);
        zipcodeToBarcode(zipcode);
    }
    else if (choose == 2) {
        let barcode = readlinesync.question(`Please input bar code:`);
        barcodeToZipcode(barcode);
    }
    else if (choose == 3) {
        process.exit();
    }

}

function zipcodeToBarcode(zipcode) {
    let options = {
        url: 'http://localhost:4000/zipcode-to-barcode',
        method: 'POST',
        json:true,
        body: {"zipcode": zipcode}
    };
    http.request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        else {
            console.log(`Please give right input`);
        }
        inputChoose();
    });
}

function barcodeToZipcode(barcode) {
    let options = {
        url: 'http://localhost:4000/barcode-to-zipcode',
        method: 'POST',
        json:true,
        body: {"barcode": barcode}
    };
    http.request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        else {
            console.log(`Please give right input`);
        }
        inputChoose();
    });
}

inputChoose();

