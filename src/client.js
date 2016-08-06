/**
 * Created by xjy on 8/5/16.
 */
const request = require('request');
let readlineSync = require('readline-sync');
console.log('Translate!');
function getInput() {
    let code = readlineSync.question('Please input code:');
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