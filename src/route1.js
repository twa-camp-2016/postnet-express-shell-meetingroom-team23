let RouteResponse = require('./command/response-route');
let mainMenu = require('./command/go-to-main-page-command');
let main = new mainMenu;

const DEFALUT_MAPPING = {'*': main.go};

class Route{
    constructor(){
        this.mapping = DEFALUT_MAPPING;
    }
    go(input){
        let command = this.mapping[input] || this.mapping['*'];
        let response = command(input);
        if (response.error) {
           return new RouteResponse({text: response.error});
        }
        if (response.reset) {
            this.mapping = DEFALUT_MAPPING;
            return new RouteResponse({
                text: response.text,
                rerun: true
            })
        }
        if (response.newMapping) {
            this.mapping = response.newMapping;
            return new RouteResponse({text: response.text});
        }
        return new RouteResponse({text:response.text});
    }
}
module.exports = Route;