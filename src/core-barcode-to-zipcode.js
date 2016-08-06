 let {loadAllBarcodes} = require('./barcodes');
class BarcodeToZipCode {
    result(barcode) {
        return this.barcodeTozipcode(barcode);
    }
    barcodeTozipcode(barcode) {
        let allBarcodes = loadAllBarcodes();
        let formattedBarcode = this.checkedPostcode(barcode);
        let build = this.buildBarcodes(formattedBarcode, allBarcodes);
        let composite = this.compositeBarcodes(build, allBarcodes);
        let check = this.calculatCheck(composite, allBarcodes);
        let zipcode = this.printBarcodes(composite, check);
        return zipcode;
    }

    checkedPostcode(postcode) {
        let pattern1 = /^\d{5}$/;
        let pattern2 = /^\d{9}$/;
        let pattern3 = /^\d{5}-\d{4}$/;
        let result = [];
        if (pattern1.test(postcode)) {
            result.push({no: postcode});
        }
        else if (pattern2.test(postcode)) {
            result.push({no: postcode});
        }
        else if (pattern3.test(postcode)) {
            let replace = _.camelCase(postcode);
            result.push({no: replace});
        }
        else {
            return {error: 'Please give right input', type: false};
        }
        return result;
    }

//#2  格式化条码成为对象数组
    buildBarcodes(fomattefPostcode) {
        if (fomattefPostcode.type !== false) {
            let barcode = fomattefPostcode[0].no;//'450561234'
            //遍历字符串
            let result = barcode.split('');//['4','']
            return result.map((r) => {
                return {no: r}
            });
        } else {
            return {error: 'Please give right input', type: false};
        }
    }

//#3 综合条码信息
    compositeBarcodes(barcodes, allBarcods) {
        if (barcodes.type !== false) {
            return barcodes.map((barcode) => {
                let result = allBarcods.find((allBarcod) => barcode.no === allBarcod.no);
                return {no: result.no, code: result.code};
            });
        } else {
            return {error: 'Please give right input', type: false};
        }
    }

//#4 计算检验码,并找到检验码的code;
    calculatCheck(barcodes, allBarcods) {
        if (barcodes.type !== false) {

            let total = 0;
            let check = 0;
            let result = [];
            barcodes.map((barcode) => {
                total += parseFloat(barcode.no);
            });
            if (total % 10) {
                check = parseFloat(10 - (total % 10));
            } else {
                check = 0;
            }
            let checkInfo = allBarcods.find((allBarcod) => parseInt(allBarcod.no) === check);
            result.push(checkInfo);
            return result;
        }
        else {
            return {error: 'Please give right input', type: false};
        }
    }

//#5 输出条码
    printBarcodes(barcodes, checks) {
        if (barcodes.type !== false) {
            let result = ['|'];
            barcodes.map((barcode) => {
                result.push(barcode.code)
            });
            checks.map((check) => {
                result.push(check.code)
            });
            result.push('|');
            return result.join('');
        }
        else {
            return {error: 'Please give right input', type: false};
        }
    }
}
module.exports = BarcodeToZipCode;
