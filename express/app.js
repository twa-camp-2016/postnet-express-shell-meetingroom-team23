var express = require('express');
var {
    ZipcodeToBarcode,
    BarcodeToZipcode
} = require('../src/main');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello, world!');
});

app.get('/result/zipcode/:zipcode', function (req, res) {
    let aa = new ZipcodeToBarcode();
    let barcode = aa.buildJudgeExecuteZipcode(req.params.zipcode);
    if (barcode === 'please enter the correct zipcode!') {
        res.status(400).end();
    } else {
        res.send('barcode:' + barcode);
    }
});


app.get('/result/barcode/:zipcode', function (req, res) {
    let aa = new BarcodeToZipcode();
    let barcode = aa.buildJudgeExecuteBarcode(req.params.zipcode);
    if (barcode === 'please enter the correct barcode!') {
        res.status(400).end();
    } else {
        res.send('zipcode:' + barcode);
    }
});

app.listen(3000, function () {
    console.log('Server listening at http://localhost:3000');
});