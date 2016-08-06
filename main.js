'use strict';
var scanf = require('linebyline');
let Route = require('../main/route');

let route = new Route();

while (1) {

    let answer = route.handle(input);
    console.log(answer.text);
}
