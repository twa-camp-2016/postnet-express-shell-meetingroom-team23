let {ZipcodeToBarcode, BarcodeToZipcode} = require('./postnet');
let express = require('express');
let bodyParser = require('body-parser');

let postnet = express();
postnet.use(bodyParser.json());

postnet.post('/postnet', function (req, res) {
  let zToB = new ZipcodeToBarcode();
  let bToZ = new BarcodeToZipcode();
  let code = req.body.code;
  let typeOfZipToBar = zToB.zipcodeToBarcode(code).type;
  let typeOfBarToZip = bToZ.barcodeToZipcode(code).type;

  if (typeOfZipToBar) {
    res.send('Your Zipcode To Barcode: ' + zToB.zipcodeToBarcode(code).code);
  } else if (typeOfBarToZip) {
    res.send('Your Barcode To Zipcode: ' + bToZ.barcodeToZipcode(code).code);
  }
  else {
    res.send('404');
  }
});

postnet.listen(3000, function () {
  console.log('Server listening at http://localhost:3000');
});

