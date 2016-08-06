let {loadAllBarcodes} = require('./barcodes');
let _ = require('lodash');
class ZipcodeToBarcode {
    result(zipcode) {
        return this.zipcodeTobarcode(zipcode);
    }
    zipcodeTobarcode(zipcode) {
        let allBarcodes = loadAllBarcodes();
        let formatted = this.getformatted(zipcode);//格式化
        let groupcodes = this.formattedGroup(formatted);//分组
        let allcodes = this.buildAll(groupcodes, allBarcodes);//查找对应的数字
        let checked = this.checkcode(allcodes);//验证检验码
        let barcode = this.printPostcode(checked)
        return barcode;
    }
    getformatted(barcode) {
        if (barcode.length === 32 || barcode.length === 52) {
            return barcode.substring(1, barcode.length - 1);

        } else {
            return {error: 'Please give right input', type: false};
        }
    }

//条码转邮编 #2 格式化(5个分组)
    formattedGroup(formattedBarcodes) {
        if (formattedBarcodes.type !== false) {
            let res = _.chunk(formattedBarcodes, 5);
            return res.map((r) => {
                return {code: r.join('')};
            });
        }
        else {
            return {error: 'Please give right input', type: false};
        }
    }

//条码转邮编 #3 查找对应的数字
    buildAll(barcodes, allBarcodes) {
        if (barcodes.type !== false) {
            return barcodes.map((barcode) => {
                let noInfo = allBarcodes.find((allBarcode) => barcode.code === allBarcode.code);
                return {no: noInfo.no, code: noInfo.code};
            });
        }
        else {
            return {error: 'Please give right input', type: false};
        }
    }

//条码转邮编 #4 找出并验证检验码
    checkcode(barcodes) {
        if (barcodes.type !== false) {
            let total = 0;
            let result = '';
            barcodes.map((barcode) => {
                total += parseFloat(barcode.no);
                result += barcode.no;
            });
            if (total % 10 === 0) {
                return result.substring(0, result.length - 1);
            } else {
                return {error: 'Please give right input', type: false};

                // return 'Please give right input';
            }
        } else {
            return {error: 'Please give right input', type: false};
        }

    }

//条码转邮编 #5 输出条码
    printPostcode(codes) {
        if (codes.type !== false) {
            if (codes.length === 9) {
                let array = codes.split('');
                array.splice(5, 0, '-');//[]
                return array.join('');
            } else {
                return codes;
            }
        }
        else {
            return {error: 'Please give right input', type: false};
        }

    }
}
module.exports = ZipcodeToBarcode;
