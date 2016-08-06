let _ = require('lodash');
"use strict";
let {loadAllBarcodes}= require('../src/allBarcodes');
class PostcodeToBarcode {
     check(input) {
        let array = input.split('');
        let flag = false;
        let flagArray = [];
        if (input.length === 5 || input.length === 9 || input.length === 10) {
            if (input.includes('-')) {
                let temp = input.split('-');
                if (temp.length === 2) {
                    if (temp[0].length === 5) {
                        flagArray = array.filter(x=> {
                            if (x >= 0 && x <= 9) {
                                return x;
                            }
                        });
                        if (flagArray.length === input.length - 1) {
                            flag = true;
                        }
                    }
                }
            }
            else {
                flagArray = array.filter(x=> {
                    if (x <= 9 && x >= 0) {
                        return x;
                    }
                });
                if (flagArray.length = input.length) {
                    flag = true;
                }
            }
        }
        return flag;

    }

    _getExitElementCodeBy(array, completePosCode) {
        return array.find(allBarcode=>allBarcode.postcode === completePosCode)
    }


     getCheckDight(postCodesArray) {
        let sum = _.chain(postCodesArray)
            .sum()
            .value();
        let dight = sum % 10;
        postCodesArray.push(dight);
        return postCodesArray;
    }

    transForm(completePosCodes, allBarcodes) {
        return "|" + completePosCodes.map((completePosCode)=> {
                let x = this._getExitElementCodeBy(allBarcodes, completePosCode);
                return x.barcode;
            }).join("") + "|";

    }

     getFormalPostCode(input) {
        return _(input)
            .replace('-', '');
    }

     buildPostCodeArray(input) {
        let line = [];
        input.split('');
        for (let x of input) {
            x = parseInt(x);
            line.push(x);
        }
        return line;
    }

    postcodeString(inputs) {
        let flag = this.check(inputs);
        let result;
        if (flag === true) {
            let formattedPostCodes = this.getFormalPostCode(inputs);
            let postCodeArray = this.buildPostCodeArray((formattedPostCodes));
            let completePosCodes = this.getCheckDight(postCodeArray);
            let allBarcodes = loadAllBarcodes();
            result = this.transForm(completePosCodes, allBarcodes);

        }
        else {
            result = 'error!';
            //console.log('error!');
        }
        require('fs').writeFileSync('2.txt', result);
        return result;
    }


}



class BarcodeToPostcode {
     getFormalBarcode(barcodes) {
        let formattedBarcodes = barcodes.split('');
        return _.chain(formattedBarcodes)
            .drop()
            .dropRight()
            .value();
    }

     chunkFormattedBarcode(barcodes) {
        return _.chunk(barcodes, 5);
    }

    transformToPoscode(chunkedBarcodes, allBarcodes) {
        let barcodes = _.chain(chunkedBarcodes)
            .map(x=>x.join(''))
            .value();
        return _.chain(barcodes)
            .map(barcode=> {
                let element = this._getExitElementPosBy(allBarcodes, barcode);
                return element.postcode
            })
            .dropRight()
            .join('')
            .value();
    }

    checkBarcode(barcodes, allBarcodes) {
        let flag = false;
        let array = barcodes.split('');
        //console.log(array);

        if (array[0] === '|' && array[array.length - 1] === '|') {
            let noarray = _.chain(array)
                .drop()
                .dropRight()
                .value();

            //console.log(noarray.length)

            if (noarray.length === 30 || noarray.length === 50) {
                let newArray = _.chunk(noarray, 5);
                _.chain(newArray)
                    .join('')
                    .value();
                //    console.log(newArray)
                let maruiqi = newArray.map(element=> {
                    return element.join('');
                });
                //console.log(maruiqi)
                let finallyArray = maruiqi.filter(x=> {
                    let y = this._getExitElementPosBy(allBarcodes, x);
                    if (y) {
                        return y.barcode;
                    }
                });
                //console.log(finallyArray)
                if (finallyArray.length === maruiqi.length) {
                    flag = true;

                }
            }
            // console.log(allBarcodes);
            //console.log(finallyArray)

        }

        return flag;

    }

    _getExitElementPosBy(array, barcode) {
        return array.find(allBarcode=>allBarcode.barcode === barcode)
    }

    barcodeString(inputs) {
        let result;
        let allBarcodes = loadAllBarcodes();
        let flag = this.checkBarcode(inputs, allBarcodes);
        if (flag === true) {
            let barcodes = this.getFormalBarcode(inputs);
            let chunkedBarcodes = this.chunkFormattedBarcode(barcodes);
            result = this.transformToPoscode(chunkedBarcodes, allBarcodes)

        }
        else {
            result = 'error!'
        }
        return result;
    }
}
module.exports = {PostcodeToBarcode,BarcodeToPostcode}
