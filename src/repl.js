let repl = require('repl');
let Route = require('./route1');
let route = new Route();

console.log(route.go().text);//打印菜单

function handleCmd(cmd, context, filename, done) {
    switchRouter({
        cmd: cmd.trim()
    }, done);
    done(null);
}
function switchRouter(context, done) {
    let result = route.go((context.cmd));
    console.log(result.text);
    if(result.rerun){
        console.log(route.go().text);
    }
    done(null);
}
let replInfo = repl.start({prompt: "> ", eval: handleCmd});