'use strict';

let classRoute = require('./route');
let route = new classRoute();

function main() {
    console.log(route.run().text);

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (input) => {
        let result = route.run(input.trim());
        console.log(result.text);
        if (result.rerun) {
            console.log(route.run().text);
        }
    });
}

main();

module.exports = main;



