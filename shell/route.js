let classGoMainMenuCmd = require('./commands/go-main-menu');
let GoMainMenuCmd = new classGoMainMenuCmd();
let commandMainMenu = GoMainMenuCmd.go;

let RouteResponse = require('./commands/route-response');

const defaultMapping = {
    '*': commandMainMenu
};

class Route {
    constructor(){
        this.mapping = defaultMapping;
    }

    run(input) {
        let command = this.mapping[input] || this.mapping['*'];
        let response = command(input);

        if (response.newMapping) {
            this.mapping = response.newMapping;
            return new RouteResponse({
                text: response.text
            });
        }

        if (response.error) {
            return new RouteResponse({
                text: response.error
            });
        }

        if (response.reset) {
            this.mapping = defaultMapping;
            return new RouteResponse({
                text: response.text,
                rerun: true
            });
        }
    }
}

module.exports = Route;

