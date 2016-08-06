"use strict";

let repl = require('repl');
let Route = require('./route');
let route = new Route();
console.log(route.run().text);
//用户输入
function handleCmd(cmd, context, filename, done) {
    switchRoute({
        cmd: cmd.trim()
    }, done);
    done(null);
}
function switchRoute(context, done) {
    let result = route.run(context.cmd);
    console.log(result.text);
    if (result.rerun) {
        console.log(route.run().text);
    }
    done(null);
}
let repInfo = repl.start({
    prompt: "# ",
    eval: handleCmd
});


