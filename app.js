var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var {changeZipcodeToBarcode} = require('./src/zipcode-to-barcode');
var {changeBarcodeToZipcode} = require('./src/barcode-to-zipcode');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

//

app.post('/zipCodeToBarCode', function (req, res) {
    let zipCode = req.body.zipCode;
    let a = new changeZipcodeToBarcode();
    let barCode = a.changeZipcodeToBarcode(zipCode);
    console.log(barCode);
    // if (barCode.text.text !== 'invalid_zipCode') {
        res.send(barCode.text.text);
    // }else{
    //     res.status(400).send();
    // }
});

app.post('/barCodeToZipCode', function (req, res) {
    let barCode = req.body.barCode;
    let a = new changeBarcodeToZipcode();
    let zipCode = a.changeBarcodeToZipcode(barCode);
    res.send(zipCode.text.text);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});