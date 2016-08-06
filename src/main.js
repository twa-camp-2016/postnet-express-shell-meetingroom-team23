/**
 * Created by SONY on 2016/8/3.
 */
let Route = require("./route");
const repl = require("repl");

let route = new Route();
console.log(route.do().text);
//接受用户输入
function handleCmd(cmd, context, filename, done) {
    switchRouter({
        cmd: cmd.trim()
    }, done);
    done(null);
}
repl.start({prompt: "> ", eval: handleCmd});
function switchRouter(context, done) {
    let result = route.do(context.cmd);
    console.log(result.text);
    if(result.rerun){
        console.log(route.do().text);
    }
    done(null);
}