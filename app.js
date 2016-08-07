var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var {changeZipcodeToBarcode} = require('./src/zipcode-to-barcode');
var {changeBarcodeToZipcode} = require('./src/barcode-to-zipcode');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/zipCodeToBarCode/:zipCode', function (req, res) {

    let zipCode = req.params.zipCode;
    let a = new changeZipcodeToBarcode();
    let barCode = a.changeZipcodeToBarcode(zipCode);

    if (barCode.text === 'invalid_zipCode') {
        res.status(400).send(barCode);

    }else{
        res.status(200).send(barCode.text.text);

    }
});

app.get('/barCodeToZipCode/:barCode', function (req, res) {
    let barCode = req.params.barCode;
    let a = new changeBarcodeToZipcode();
    let zipCode = a.changeBarcodeToZipcode(barCode);

    if (zipCode.text === 'invalid_barCode') {
        res.status(400).send(zipCode);

    }else{
        res.status(200).send(zipCode.text.text);

    }
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});