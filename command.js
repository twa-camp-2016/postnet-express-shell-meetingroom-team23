let {TranslateZipcodeToBarcode} = require('../main/zipcode-to-barcode');
let {TranslateBarcodeToZipcode} = require('../main/barcode-to-zipcode');

const translateZipcodeToBarcode = new TranslateZipcodeToBarcode();
const translateBarcodeToZipcode = new TranslateBarcodeToZipcode();

class CommandRespone {
    constructor({text, newMapping, err, reset}) {
        this.text = text;
        this.newMapping = newMapping;
        this.err = err;
        this.reset = reset;
    }
}
class goToBarcodePage {
    run() {
        return new CommandRespone({
            text: `Please input zip code:`,
            newMapping: {'*': buildBarcode}
        });
    }
}

class goToZipCodePage {
    run() {
        return new CommandRespone({
            text: `Please input bar code:`,
            newMapping: {'*': buildZipcode}
        });
    }
}

class goToQuitPage {
    run() {
        process.exit();
    }
}

class goToReinputPage {
    run() {
        return new CommandRespone({err: `Please give right input`});
    }
}

class goToMenuPage {
    run() {
        return new CommandRespone({
            text: `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`,
            newMapping: {
                '1': goToBarcodePage,
                '2': goToZipCodePage,
                '3': goToQuitPage,
                '*': goToReinputPage
            }
        });
    }
}

class buildBarcode {
    run(input) {
        let barcode = translateZipcodeToBarcode.translate(input);
        if (barcode.text === false) {
            return new CommandRespone({err: `Please give right input`});
        } else {
            return new CommandRespone({
                text: barcode.text,
                reset: true
            });
        }
    }
}

class buildZipcode {
    run(input) {
        let zipcode = translateBarcodeToZipcode.translate(input);
        if (zipcode.text === false) {
            return new CommandRespone({err: `Please give right input`});
        } else {
            return new CommandRespone({
                text: zipcode.text,
                reset: true
            });
        }
    }
}

module.exports = goToMenuPage;