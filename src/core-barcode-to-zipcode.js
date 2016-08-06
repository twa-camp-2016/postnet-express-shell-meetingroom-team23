let {checkedPostcode,buildBarcodes,compositeBarcodes,calculatCheck,printBarcodes} = require('./core')
let {loadAllBarcodes} = require('./barcodes');
class printZipcode{
    go(barcode) {
        let allBarcodes = loadAllBarcodes();
        let formattedBarcode = checkedPostcode(barcode);
        let build = buildBarcodes(formattedBarcode, allBarcodes);
        let composite = compositeBarcodes(build, allBarcodes);
        let check = calculatCheck(composite, allBarcodes);
        let zipcode = printBarcodes(composite, check);
        return zipcode;
    }
}
module.exports = printZipcode;
