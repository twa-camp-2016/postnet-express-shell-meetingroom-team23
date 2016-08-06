let {braCodeToZipCode} = require('../main');
// module.exports = function (barcode) {
//     let zipcode = braCodeToZipCode(barcode);
//     if (zipcode === false) {
//         return {
//             error: 'Please give right input'
//         }
//     } else {
//         return {
//             text: zipcode,
//             reset: true
//         }
//     }
// };
let CommandResponse = require('../CommandResponse');
class BarcodeToZipcode {
    run(barcode) {
        let zipcode = braCodeToZipCode(barcode);
        if (zipcode === false) {
            return new CommandResponse({
                    error: 'Please give right input'
            });
        } else {
            return new CommandResponse({
                text: zipcode,
                reset: true
            });
        }
    }
}
module.exports = BarcodeToZipcode;