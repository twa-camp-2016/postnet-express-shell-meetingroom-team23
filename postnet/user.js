const request = require('request');
let readlineSync = require('readline-sync');


function start() {
    console.log('Welcome!');
    console.log(`|1. Translate zip code to bar code
|2. Translate bar code to zip code
|3. Quit
|Please input your choices(1~3)`);
    let code = readlineSync.question('please input ur postcode:');
    translate(code)


}

function translate(code) {
    const option = {
        url: "http://localhost:3005/postcodeTobarcode",
        method: "POST",
        json: true,
        body: {'code': code}
    };console.log(option);
    request(option, function (error, response, body) {
        console.log(body);
        start();
    });
}

start();