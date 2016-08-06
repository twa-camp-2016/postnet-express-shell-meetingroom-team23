"use strict";
let {TranslateBarcodeToZipcode} = require('../main/barcode-to-zipcode');
let {TranslateZipcodeToBarcode} = require('../main/zipcode-to-barcode');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/zipcode-to-barcode',function (req,res) {
    let translateZipcodeToBarcode = new TranslateZipcodeToBarcode();
    let barcode = translateZipcodeToBarcode.translate(req.body.zipcode);
    if(barcode.text !== false) {
        res.status(200).send(barcode.text);
    }else {
        res.sendStatus(400).end();
    }
});

app.post('/barcode-to-zipcode',function (req,res) {
    let translateBarcodeToZipcode = new TranslateBarcodeToZipcode();
    let zipcode = translateBarcodeToZipcode.translate(req.body.barcode);
    if(zipcode.text !== false){
        res.status(200).send(zipcode.text);
    }else {
        res.sendStatus(400).end();
    }
});

app.listen(4000, function () {
    console.log('Server listening at http://localhost:4000');
});

module.exports = app;

