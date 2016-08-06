"use strict";
let {TranslateBarcodeToZipcode} = require('../main/barcode-to-zipcode');
let {TranslateZipcodeToBarcode} = require('../main/zipcode-to-barcode');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let translateBarcodeToZipcode = new TranslateBarcodeToZipcode();
let translateZipcodeToBarcode = new TranslateZipcodeToBarcode();

app.get('/zipcode-to-barcode',function (req,res) {
    let barcode = translateZipcodeToBarcode.translate(req.body.zipcode);
    if(barcode.text !== false) {
        res.status(200).send(barcode.text);
    }else {
        res.sendStatus(400).end();
    }
});

app.get('/barcode-to-zipcode',function (req,res) {
    let zipcode = translateBarcodeToZipcode.translate(req.body.barcode);
    if(zipcode.text !== false){
        res.status(200).send(zipcode.text);
    }else {
        res.sendStatus(400).end();
    }
});

app.listen(3000, function () {
    console.log('Server listening at http://localhost:4000');
});

module.exports = app;

