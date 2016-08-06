let express = require('express');
let BarcodeToZipcodeTrans = require('./src/barcodetozipcodeTrans');
let ZipcodeToBarcodeTrans = require('./src/zipcodetobarcodeTrans');
let app = express();


app.get('/result', function (req, res) {
    let barcodeTranslater = new BarcodeToZipcodeTrans();
    let zipcodeTranslater = new ZipcodeToBarcodeTrans();
    let code = req.query.Barcode;
    let typeBarcode = barcodeTranslater.run(code);
    let typeZipcode = zipcodeTranslater.run(code);
    if (typeBarcode) {
        res.send('Hello GET:' + barcodeTranslater.run(req.query.Barcode).result);
    } else if (typeZipcode) {
        res.send('Hello GET:' + zipcodeTranslater.run(req.query.Barcode).result);
    } else {
        res.send("输入错误.");
    }

});
app.get('/hello', function (req, res) {
    res.send("Hello!");
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});