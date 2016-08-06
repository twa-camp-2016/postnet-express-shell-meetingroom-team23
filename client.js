const request = require('request');
let readlineSync = require('readline-sync');

function getInput() {
    console.log(`
======================
zipCode to barCode: 1
barCode to zipCode: 2
quit: 3
please input (1-3):
======================
`);

    let input = readlineSync.question('请输入您的选择:');
    if (input == 1) {

        let zipCode = readlineSync.question('请输入zipCode:');

        runZipCode(zipCode);
    } else if (input == 2) {
        let barCode = readlineSync.question('请输入barCode:');

        runBarCode(barCode);
    } else if (input == 3) {
        process.exit();
    } else {
        console.log('请给出合法的输入！！！');

        getInput();
    }
}

function runZipCode(zipCode) {

    const optionZipCode = {
        url: "http://localhost:3000/zipCodeToBarCode/" + zipCode
    };

    request(optionZipCode, function (error, response, body) {

        if (response.statusCode === 200) {
            console.log(body);

            getInput();
        }else{

            let zipcode = readlineSync.question('请输入合法的zipCode:');
            runZipCode(zipcode);
        }

    });


}

function runBarCode(barCode) {
    const optionBarCode = {
        url: "http://localhost:3000/barCodeToZipCode/" + barCode
    };

    request(optionBarCode, function (error, response, body) {
        
        if (response.statusCode === 200) {
            console.log(body);

            getInput();
        }else {
            let barCode = readlineSync.question('请输入合法的barCode:');
            console.log(barCode);
            runBarCode(barCode);
        }
    });
}

getInput();




