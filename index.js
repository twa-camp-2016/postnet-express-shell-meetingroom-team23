"use strict";
let Route = require('./src/route');
let route = new Route();
let express= require('express');
let app = express();

app.get('/',function (req,res) {
     res.send(route.run().text);
});
app.get('/choose/:chosen',function (req,res) {
    let chosen = req.params.chosen;
    let returnText = route.run(chosen).text;
    res.send('chosen：' + returnText);
});
app.get('/choose/2/barcode/:barcode',function (req,res) {
    let barcode = req.params.barcode;
    let zipcode = route.run(barcode).text;
    res.send('zipcode：' + zipcode);
});
app.listen(3000,function(){
    console.log('Server listening at http://localhost:3000');
});
