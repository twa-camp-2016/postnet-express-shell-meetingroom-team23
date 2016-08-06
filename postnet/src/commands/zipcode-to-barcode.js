let {zipCodeToBarCode} = require('../main');
// module.exports = function (zipcode) {
//     let barcode = zipCodeToBarCode(zipcode);
//
//     if (barcode === false) {
//         return {
//             error: 'Please give right input',
//         }
//     } else {
//         return {
//             text: barcode,
//             reset: true
//         }
//     }
// };
let CommandResponse = require('../CommandResponse');
class ZipcodeToBarcode {
     run(zipcode){
         let barcode = zipCodeToBarCode(zipcode);

         if (barcode === false) {
             return new CommandResponse({
                 error: 'Please give right input',
             });
         } else {
             return new CommandResponse({
                 text: barcode,
                 reset: true
             });
         }
     }
}
module.exports = ZipcodeToBarcode;
