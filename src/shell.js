let scanf = require('scanf');
let {Route} = require('./route');

for (let i = 1; i > 0;) {
    let rt = new Route();
    let input = scanf('%s');
    let response = rt.route(input);
    console.log('%s', response.text);
    if (response.rerun) {
        let response  = rt.route(input);
    }
}

