let {
    ZipcodeToBarcode,
    BarcodeToZipcode
} = require('../src/main');




class promptCommand{
    translate() {
        let lines = ['According to need to choose option'];
        lines.push('1.zipcode to barcode');
        lines.push('2.barcode to zipcode');
        lines.push('3.quit');
        let reminder = lines.join('\n');
        return {
            text:reminder,
            newMapping:{
                '1':goToBarcodeCommand,
                '2':goToZipcodeCommand,
                '3':goToQuitCommand,
                '*':otherCommand
            }
        }
    }
}

class goToBarcodeCommand{
    translate(zipcode) {
        return {
            text:'please input zipcode!',
            newMapping:{
                '*':zicodeToBarcodeCommand
            }
        }
    }
}

class goToZipcodeCommand{
    translate(barcode) {
        return {
            text:'please input barcode!',
            newMapping:{
                '*':barcodeToZipcodeCommand
            }
        }
    }
}

class goToQuitCommand{
    translate() {
        process.exit();
    }
}


class otherCommand{
    translate() {
        return {
            error: 'please give right input '
        }
    }
}

class zicodeToBarcodeCommand{
    translate(zipcode) {
        let zipcodeToBarcode = new ZipcodeToBarcode();
        let result = zipcodeToBarcode.buildJudgeExecuteZipcode(zipcode);

        if(result === 'please enter the correct zipcode!'){
            return {
                error:result
            }
        }else {
            return{
                text:result,
                reset:true
            }
        }
    }
}

class barcodeToZipcodeCommand{
    translate(barcode) {
        let barcodeToZipcode = new BarcodeToZipcode();
        let result = barcodeToZipcode.buildJudgeExecuteBarcode(barcode);
        if(result === 'please enter the correct barcode!'){
            return{
                error:result
            }
        }else {
            return{
                text:result,
                reset:true
            }
        }
    }
}


module.exports = {
    promptCommand
}