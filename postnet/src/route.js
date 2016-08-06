let commandMainPage = require('../src/commands/goto-main-page');


let RouteResponse = require('./route-response');

const defaultMapping = {"*": new commandMainPage() };

class Route {
    constructor() {
        this.mapping = defaultMapping;
    }
    handle(input) {
        let command = this.mapping[input] || this.mapping['*'];
        let response = command.run(input);
        if (response.error) {
            return new RouteResponse({
                text: response.error
            });
        }
        if (response.reset) {
            this.mapping = defaultMapping;
            return new  RouteResponse({
                text: response.text,
                reset: true
            });
        }
        if (response.newMapping) {
            this.mapping = response.newMapping;
            return new RouteResponse({
                text: response.text
            });
        }
        return new RouteResponse({
            text: response.text
        });
    }
}

module.exports = Route;


