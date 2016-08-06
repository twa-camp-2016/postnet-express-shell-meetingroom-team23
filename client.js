let request = require('request');
let readlineSync = require('readline-sync');

function getInput() {
    let code = readlineSync.question().trim();
    translate(code);
}

function translate(code) {
    const option = {
        url: "http://localhost:3000/result",
        method: "POST",
        json: true,
        body: {'code': code}
    };
    request(option, function (error, response, body) {
        console.log(body);
        getInput();
    });
}

getInput();





