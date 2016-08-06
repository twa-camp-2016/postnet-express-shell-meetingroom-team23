/**
 * Created by SONY on 2016/8/5.
 */
const request = require('request');
let readlineSync = require('readline-sync');


console.log('Welcome!');


function getInput() {
    let code = readlineSync.question('请输入code:');
    translate(code);
}


function translate(code) {
    const option = {
        url: "http://localhost:3000/translate",
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






