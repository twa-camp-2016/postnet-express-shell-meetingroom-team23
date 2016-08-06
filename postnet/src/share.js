let {Route} =require('../src/route')
let scanf = require('scanf');
let a = new Route;
while (1) {
    let input = scanf('%s');
    let result = a.handle(input);
    console.log(result.text);

}
