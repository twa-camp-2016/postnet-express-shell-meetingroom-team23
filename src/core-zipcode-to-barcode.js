let {getformatted,formattedGroup,buildAll,checkcode,printPostcode} = require('./core')
let {loadAllBarcodes} = require('./barcodes');
class printBarcode{
    go(barcode){
        let allBarcodes = loadAllBarcodes();
        let formatted = getformatted(barcode);//格式化
        let groupcodes = formattedGroup(formatted);//分组
        let allcodes = buildAll(groupcodes, allBarcodes);//查找对应的数字
        let checked = checkcode(allcodes);//验证检验码
        let result = printPostcode(checked)
        return result;
    }
}
module.exports = printBarcode;