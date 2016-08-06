let _ = require('lodash');
let {loadBarcodeList} = require('./loadBarcodeTable.js');
let barcodeList = loadBarcodeList();

class ZipcodeToBarcode {
  zipcodeToBarcode(zipcode) {console.log(zipcode);
    let correctZipcode = new CheckZipCode();
    if (correctZipcode.checkZipCode(zipcode).type === true) {
      let formattedZipcode = new FormatZipCode();
      formattedZipcode = formattedZipcode.formatZipCode(correctZipcode.checkZipCode(zipcode));
      let checkedCD = new AddCheckCD();
      checkedCD = checkedCD.addCheckCD(formattedZipcode);
      let result = new Trans2Barcode();
      return result.trans2Barcode(checkedCD,barcodeList);

    }
    else {
      return {type: false, code: zipcode};
    }
  }
}
class BarcodeToZipcode{
  barcodeToZipcode(barcode) {
    let formattedBarcode = new FormatBarcode();
    formattedBarcode = formattedBarcode.formatBarcode(barcode);
    if (formattedBarcode.type === true) {
      let zipcode = new Trans2Zipcode();
      zipcode = zipcode.trans2Zipcode(formattedBarcode, barcodeList);
      let result = new CheckCD();
      return result.checkCD(zipcode);
    } else {
      return {
        type: false,
        code: barcode
      }
    }
  }
}

class CheckZipCode{
  checkZipCode(zipcode) {

    let zipcodeArray = zipcode.split("");
    let position = _.indexOf(zipcode, "-");
    let reverseZipcodeString = _.reverse(zipcodeArray);
    let reversePosition = _.indexOf(reverseZipcodeString, "-");
    let numberZipcodeArray = _.map(zipcodeArray, x => parseInt(x));

    if (zipcodeArray.length !== 5 && zipcodeArray.length !== 9 && zipcodeArray.length !== 10) {
      return {type: false, code: zipcode};
    }
    else if (zipcodeArray.length === 10 && position !== reversePosition && position !== -1) {
      return {type: false, code: zipcode};
    }
    else if (zipcodeArray.length === 5 && position !== -1) {
      return {type: false, code: zipcode};
    }
    else if (zipcodeArray.length === 9 && position !== -1) {
      return {type: false, code: zipcode};
    }

    else if (zipcodeArray.length === 10 && position !== 5) {
      return {type: false, code: zipcode};
    }
    else if (numberZipcodeArray.includes(NaN)) {
      return {type: false, code: zipcode};
    }
    else {
      return {type: true, code: zipcode};
    }
  }
}
class FormatZipCode{
  formatZipCode(correctZipCode) {
    //console.log(correctZipCode);
    if(correctZipCode.type === true){
      let zipCodeArray = correctZipCode.code.split('');
      if (zipCodeArray.length === 10) {
        return _.chain(zipCodeArray)
          .difference(['-'])
          .map(x =>parseInt(x))
          .value();
      }
      else return _.chain(zipCodeArray)
        .map(x =>parseInt(x))
        .value();
    }
    else{
      return{type: false,code:correctZipCode.code};
    }
  }
}
class AddCheckCD{
  addCheckCD(formattedZipCode) {
    let checkCD = 10 - _.sum(formattedZipCode) % 10;
    return _.concat(formattedZipCode, checkCD);
  }
}
class Trans2Barcode{
  trans2Barcode(checkedCD, barcodeList) {
    let beforeBarcode = _.map(checkedCD, item => {
      return barcodeList[(item)];
    });
    return {type: true, code: _(beforeBarcode).join('')}
  }
}

class FormatBarcode{
  formatBarcode(barcode) {
    let temp = barcode.split('');
    if (temp.length !== 32 && temp.length !== 52) {
      return {type: false, code: barcode};
    }
    else if (temp.length === 32 || temp.length === 52) {
      return {
        type: true,
        code: _.chain(barcode)
          .split('')
          .drop()
          .dropRight()
          .chunk(5)
          .map(x => x.join(''))
          .value()
      }
    }
  }
}
class Trans2Zipcode{
  trans2Zipcode(formattedBarcode, barcodeList) {
    let beforeZipcode = _.map(formattedBarcode.code, function (formattedBarcode) {
      return _.indexOf(barcodeList, formattedBarcode);
    });
    let tag = _.map(formattedBarcode.code, barcode => {
      return !!barcodeList.includes(barcode);
    });
    if (tag.includes(false)) {
      return {type: false, code: formattedBarcode.code.join('')};
    }
    else {
      return (beforeZipcode.join(''));
    }
  }
}

class CheckCD{
  checkCD(zipcode) {
    let zipcodeArray = zipcode.split('');
    let checkCD = _.chain(zipcodeArray)
      .map(x => parseInt(x))
      .last()
      .value();
    let correctCHeckCD = 10 - _.sum(zipcodeArray) % 10;
    if (checkCD === correctCHeckCD) {
      if (zipcodeArray.length === 10) {
        zipcodeArray.splice(5, 0, '-');
      }
      return {type: true, code: _.dropRight(zipcodeArray).join('')};
    }
    else {
      return {type: false, code: zipcode};
    }
  }
}

module.exports = {
  CheckZipCode,
  FormatZipCode,
  AddCheckCD,
  Trans2Barcode,
  FormatBarcode,
  Trans2Zipcode,
  CheckCD,
  ZipcodeToBarcode,
  BarcodeToZipcode
};
