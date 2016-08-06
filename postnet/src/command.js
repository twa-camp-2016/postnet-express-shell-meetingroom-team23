let {postcodeString, barcodeString,} = require('../src/codeTransform');
class RouteResponse {
    constructor({text, rerun}) {
        this.text = text;
        this.rerun = rerun;
    }
}
class CommandResponse {
    constructor({error, text, reset, newMapping}) {
        this.error = error,
            this.text = text,
            this.reset = reset,
            this.newMapping = newMapping
    }
}
class Menu {
    run() {

        return new CommandResponse({
            text: `|1. Translate zip code to bar code
|2. Translate bar code to zip code
|3. Quit
|Please input your choices(1~3)`,
            newMapping: {
                "1": new gotoPostcodeTobarcodePage(),
                '2': new gotoBarcodeToPostcodePage(),
                '3': new gotoQuitPage(),
                '*': new commandInvalidInput()
            }
        })
    }

}
class commandInvalidInput {
    run() {
        return new CommandResponse({
            error: 'give a right input '
        });
    }
}
class gotoPostcodeTobarcodePage {
    run() {
        return new CommandResponse({
            text: 'please input ur postcode',
            newMapping: {
                '*': new gotoPostcodePageCommand()
            }
        });
    }
}
class gotoPostcodePageCommand {
    run(postcode) {
        let barcode = postcodeString(postcode);
        if (barcode === 'error!') {
            return new CommandResponse({
                error: 'please input right postcode'
            })
        }
        else {
            return new CommandResponse({
                text: barcode,
                reset: true
            })
        }
    }
}
class gotoBarcodeToPostcodePage {
    run() {
        return new CommandResponse({
            text:'please input ur barcode',
            newMapping:{
                '*':new gotoBarcodePageCommand()
            }
        })
    }
}
class gotoBarcodePageCommand {
    run(bacode) {
        let postcode = barcodeString(bacode);
        if (postcode === 'error!') {
            return new CommandResponse({
                error:'input ringht barcode'
            })
        }
        else {
            return new CommandResponse({
                reset: true,
                text: postcode
            })
        }

    }
}
class gotoQuitPage {
    run() {
        process.exit();
    }
}

module.exports = {
    Menu: Menu,
    gotoPostcodePageCommand: gotoPostcodePageCommand,
    gotoBarcodePageCommand: gotoBarcodePageCommand,
    gotoQuitPage: gotoQuitPage,
    commandInvalidInput: commandInvalidInput,
    RouteResponse:RouteResponse,
    CommandResponse:CommandResponse
}

