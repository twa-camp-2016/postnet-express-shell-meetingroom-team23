const request = require('request');
let readlineSync = require('readline-sync');

function getInput() {
    let code = readlineSync.question('请输入code:');
    run(code);
}


function run(code) {
    const option = {
        url: "http://localhost:3000/zipCodeToBarCode",
        method: "POST",
        json: true,
        body: {'zipCode': code}
    };

    request(option, function (error, response, body) {
        if(body)
        console.log(body);
        getInput();
    });
}

getInput();




