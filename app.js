/**
 * Created by SONY on 2016/8/5.
 */
let express = require('express');
let bodyParser = require("body-parser");

let BarcodeToZipcode = require('./src/core/getposttobar-core');
let ZipcodeToBarcode = require('./src/core/getbartopost-core');


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

app.post('/translate', function (req, res) {
    let code = req.body.code;

    let barcodetozipcode = new BarcodeToZipcode();
    let typeBarcode = barcodetozipcode.checkPostCode(code);

    let zipcodetobarcode = new ZipcodeToBarcode();
    let typeZipcode = zipcodetobarcode.checkBarcode(code);

    if (typeZipcode !== false) {
        res.send("转码结果是：" + zipcodetobarcode.do(code));

    } else if (typeBarcode !== false) {
        res.send("转码结果是：" + barcodetozipcode.do(code));

    }
    else {
        res.send("您输入的结果有误，请重新输入。");
    }

});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


