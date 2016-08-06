/**
 * Created by zhuoyue on 16-8-5.
 */
const request = require('request');
let readlineSync = require('readline-sync');

function getInput() {
    let code = readlineSync.question('请输入code:');
    translate(code);
}

function translate(code) {
    const option = {             //自定义 HTTP Headers  request会将将这些设置项放到http的请求headers中
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
