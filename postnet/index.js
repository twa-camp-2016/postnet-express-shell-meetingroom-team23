var express = require('express');
var {PostcodeToBarcode,BarcodeToPostcode} =require('./src/codeTransform')
var app = express();

app.post('/postcodeTobarcode', function(req, res) {
    let code = req.body.code;
    let one = new PostcodeToBarcode();
    let barcode = one.postcodeString(code);
    if (barcode==='error!') {
        res.sendStatus(400);
    }
    else{
        res.send(barcode);
        res.sendStatus(200);
    }
});


app.get('/barcodeTopostcode/:barcode', function(req, res) {
    let postcode = BarcodeToPostcode.barcodeString(req.params.barcode );
    if (postcode==='error!') {
        res.sendStatus(400);
    }
    else{
        res.send(postcode);
        res.sendStatus(200);
    }
});
app.listen(3005, function () {
    console.log('Server listening at http://localhost:3005');
});