let http = require('http');
let readlinesync = require('readline-sync');


function inputChoose() {
    let lines = ['According to need to choose option'];
    lines.push('1.zipcode to barcode');
    lines.push('2.barcode to zipcode');
    lines.push('3.quit');
    let reminder = lines.join('\n');

    let choose = readlinesync.qusetion(reminder);
    translate(choose);
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