/**
 * Created by zhuoyue on 16-8-5.
 */
let express = require('express');
let ZipToBarCore=require('./core/zip-to-bar-core');
let BarToZipCore=require('./core/bar-to-zip-core');
let bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// 解析 application/json
// 解析 application/x-www-form-urlencoded
//经过这个中间件处理后，就可以在所有路由处理器的req.body中访问请求参数。

app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

app.post('/result', function (req, res) {

    let code = req.body.code;
    let barToZip = new BarToZipCore();
    let typeBarcode = barToZip.check(code);

    let zipToBar = new ZipToBarCore();
    let typeZipcode = zipToBar.check(code);

    if (typeZipcode!==false) {
        res.send( zipToBar.do(code));

    } else if (typeBarcode!==false) {
        res.send( barToZip.do(code));
    }

    else {
        res.send("please input right input");
    }

});
app.listen(3000, function () {
    console.log('Server listening at http://localhost:3000');
});
