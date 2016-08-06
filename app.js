let BarcodeToZipCode = require('./src/core-barcode-to-zipcode');
let tozipcode = new BarcodeToZipCode();
let ZipcodeToBarcode = require('./src/core-zipcode-to-barcode');
let tobarcode = new ZipcodeToBarcode();

let Route = require('./src/route1');
let route = new Route();
var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.send(route.go().text);
});
app.get('/choice/:choice', function(req, res) {
    let choice = req.params.choice;
    res.send(route.go(choice).text);
});
app.get('/barcode-to-zipcode/:barcode', function(req, res) {
    let barcode = req.params.barcode;
    let zipcode = tozipcode.result(barcode);
    res.send('zipcode is:'+ zipcode);
});
app.get('/zipcode-to-barcode/:zipcode', function(req, res) {
    let zipcode = req.params.zipcode;
    let barcode = tobarcode.result(zipcode);
    res.send('barcode is:'+ barcode);
});
app.listen(3000, function () {
    console.log('Server listening at http://localhost:3000');
});