
let readline = require('readline');
let Route = require('./route');

const route = new  Route();

function sendToRoute(line) {
    let response = route.handle(line);
    console.log(response.text);
    if(response.reset){
        sendToRoute(line);
    }
}
 function aaa() {
    let rl = readline.createInterface({
        input: process.stdin,
        output:process.stdout,
        terminal:false
    });
    rl.on('line',function (line) {
         sendToRoute(line)
    });
    sendToRoute();
};

aaa();