let bodyParser = require("body-parser");

let express = require('express');
let  app = express();

// let BestCharge = require('./core/best-charge');
// let obj = new BestCharge();

let Route = require('./shell/route');
let route = new Route();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/result', function (req, res) {
    let code = req.body.code;
    res.send(route.run(code).text);
});


app.listen(3000, function () {
    console.log('Server listening at http://localhost:3000');
});