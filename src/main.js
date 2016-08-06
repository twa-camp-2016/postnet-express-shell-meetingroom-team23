let {loadAllItems, correntBarcode}=require('../src/items');

let _ = require('lodash');

class Mate{
    getMateBarcode(n, allItems) {
        return _.find(allItems, b => b.zipcode === n);
    }

    getMateZipcode(barcode, allItems) {
        return _.find(allItems, (item)=>item.barcode === barcode);
    }

    judgeBarcode(allBarcode, barcodeArray) {
        let i = 0;
        for (let subItems of barcodeArray) {
            if (_.includes(allBarcode, subItems)) {
                i++;
            }
        }
        return i;
    }
}

class ZipcodeToBarcodeMain {

    getFormatedZipcode(zipcode) {
        return _.camelCase(zipcode);
    }


    getArrayZipcode(formatedZipcode) {
        let zipcodeSting = _.split(formatedZipcode, '');
        return _.map(zipcodeSting, (n)=> {
            return parseInt(n);
        });
    }


    getCheckNumber(arrayZipcode) {
        let sum = _.sum(arrayZipcode);
        let checkNum = 10 - sum % 10;
        return _.concat(arrayZipcode, checkNum);
    }



    getBarcode(allItems, checkNumberBarcode) {
        let mate = new Mate();
        let barcodes = _.map(checkNumberBarcode, (n)=> {
            let {barcode} = mate.getMateBarcode(n, allItems);
            return barcode;
        });
        return `|${barcodes.join('')}|`;

    }

}

class ZipcodeToBarcodeRealize {
    buildBarcode(zipcode) {
        console.log(zipcode);
        let main = new ZipcodeToBarcodeMain();
        let formatedZipcode = main.getFormatedZipcode(zipcode);
        let arrayZipcode = main.getArrayZipcode(formatedZipcode);
        let checkNumber = main.getCheckNumber(arrayZipcode);
        let allItems = loadAllItems();
        return main.getBarcode(allItems, checkNumber);
    }
}

class ZipcodeToBarcode {
    buildJudgeExecuteZipcode(zipcode) {
        let realine = new ZipcodeToBarcodeRealize();
        console.log(zipcode);
        if (zipcode.length === 5) {
            let arrayZipcode = _.split(zipcode, '');
            let numberZipcode = _.map(arrayZipcode, (n)=> {
                return parseInt(n);
            });
            let found = _.includes(numberZipcode, NaN);
            if (found) {
                return 'please enter the correct zipcode!'
            } else {
                return realine.buildBarcode(zipcode);
            }
        } else if (zipcode.length === 9) {
            let arrayZipcode = _.split(zipcode, '');
            let numberZipcode = _.map(arrayZipcode, (n)=> {
                return parseInt(n);
            });
            let found = _.includes(numberZipcode, NaN);
            if (found) {
                return 'please enter the correct zipcode!'
            } else {
                return realine.buildBarcode(zipcode);
            }
        } else if (zipcode.length === 10) {
            let first_ = _.indexOf('-');
            let last_ = _.lastIndexOf('-');
            if (first_ === last_) {
                let array = _.split(zipcode, '-');
                if (array[0].length === 5 && array[1].length === 4) {
                    let numberArray_0 = _.map(array[0], (n)=> {
                        return parseInt(n);
                    });
                    let numberArray_1 = _.map(array[1], (n)=> {
                        return parseInt(n);
                    });
                    let found_0 = _.includes(numberArray_0, NaN);
                    let found_1 = _.includes(numberArray_1, NaN);
                    if (found_0) {
                        return 'please enter the correct zipcode!'
                    } else if (found_1) {
                        return 'please enter the correct zipcode!'
                    } else {
                        return realine.buildBarcode(zipcode);
                    }
                } else {
                    return 'please enter the correct zipcode!'
                }
            } else if (first_ !== last_) {
                return 'please enter the correct zipcode!'

            } else {
                return 'please enter the correct zipcode!'
            }
        } else {
            return 'please enter the correct zipcode!'
        }

    }

}

class BarcodeToZipcodeMain {
    getFormatedBarcode(barcode) {
        let array = _.split(barcode, '');
        let dropFirst = _.drop(array);
        let dropLast = _.dropRight(dropFirst);
        let dropCheck = _.dropRight(dropLast, 5);
        let arrayBarcode = _.chunk(dropCheck, dropCheck.length / (dropCheck.length / 5));
        let subBarcodes = _.map(arrayBarcode, (arr)=> {
            return arr.join('');
        });

        return _.flatMapDeep(subBarcodes);
    }


    getZipcodeArray(allItems, formatedBarcodes) {
        let mate = new Mate();
        return _.map(formatedBarcodes, (n)=> {
            let {zipcode} = mate.getMateZipcode(n, allItems);
            return zipcode;
        });
    }

    getZipcode(zipcodeArray) {
        if (zipcodeArray.length === 9) {
            let front = _.dropRight(zipcodeArray, 4).join('');
            let behind = _.drop(zipcodeArray, 5).join('');
            return `${front}-${behind}`;
        } else {
            return zipcodeArray.join('');
        }
    }
}

class BarcodeToZipcodeRealize {
    buildZipcode(barcode) {
        let main = new BarcodeToZipcodeMain();
        let formatedBarcode = main.getFormatedBarcode(barcode);
        let zipcodeArray = main.getZipcodeArray(loadAllItems(), formatedBarcode);
        return main.getZipcode(zipcodeArray);
    }
}

class BarcodeToZipcode{
    buildJudgeExecuteBarcode(barcode) {
        let realize = new BarcodeToZipcodeRealize();
        let mate = new Mate();
        let main = new BarcodeToZipcodeMain();
        let array = _.split(barcode, '');
        if (array[0] === '|' && array[array.length - 1] === '|') {
            let dropFrist = _.drop(array);
            let dropLast = _.dropRight(dropFrist);
            if (dropLast.length === 30 || dropLast.length === 50) {
                let arrayBarcode = _.chunk(dropLast, dropLast.length / (dropLast.length / 5));
                let subBarcodes = _.map(arrayBarcode, (arr)=> {
                    return arr.join('');
                });
                let allBarcode = correntBarcode();
                let found = mate.judgeBarcode(allBarcode, subBarcodes);
                if (found === subBarcodes.length) {
                    let checkBarcode = _.drop(subBarcodes, subBarcodes.length - 1);
                    let allItems = loadAllItems();
                    let {zipcode} = mate.getMateZipcode(checkBarcode[0], allItems);
                    let formatedBarcode = main.getFormatedBarcode(barcode);
                    let zipcodeArray = main.getZipcodeArray(loadAllItems(), formatedBarcode);
                    let zipcodeSum = _.sum(zipcodeArray);
                    if (zipcode === 10 - zipcodeSum % 10) {
                        return realize.buildZipcode(barcode);
                    } else if (10 - zipcode % 10 === 10 && zipcode === 0) {
                        return realize.buildZipcode(barcode);
                    }
                    else {
                        return 'please enter the correct barcode!'
                    }
                } else {
                    return 'please enter the correct barcode!'
                }
            } else {
                return 'please enter the correct barcode!'
            }
        } else {
            return 'please enter the correct barcode!'
        }
    }
}


module.exports = {
    Mate,
    ZipcodeToBarcodeMain,
    ZipcodeToBarcodeRealize,
    ZipcodeToBarcode,
    BarcodeToZipcodeMain,
    BarcodeToZipcodeRealize,
    BarcodeToZipcode
};
