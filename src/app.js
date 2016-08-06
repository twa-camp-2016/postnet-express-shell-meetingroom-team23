"use strict";
let ZipcodeToBarcodeCore=require("./zipcode-to-barcode-core");
let BarcodeToZipcodeCore=require("./barcode-to-zipcode-core");
var express = require('express');
var app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/result', function(req, res) {
  
  let zToB=new ZipcodeToBarcodeCore();
  let typeZ=zToB.check(req.body.code);
  let bToZ=new BarcodeToZipcodeCore();
  let typeB=bToZ.check(req.body.code);
  if(typeZ===true){
    let zToBResult= zToB.action(req.body.code);
    res.send('zToB, ' + zToBResult);
  }else if(typeB===true){
    let bToZResult=bToZ.action(req.body.code);
    res.send('zToB, ' + bToZResult);
  }else{
    res.send("Please give right input!");
  }
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});