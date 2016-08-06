let {Menu,RouteResponse,CommandResponse} =require('../src/command');
let defaultMapping = {
    '*': new Menu()
};

class Route {
    constructor() {
        this.mapping = defaultMapping;
    }

    handle(input) {
        let command = this.mapping[input] || this.mapping['*'];
        let response = command.run(input);
        if (response.error) {
            return new RouteResponse({
                text:response.error
            })
        }
        if (response.reset) {
            this.mapping = defaultMapping;
            return new RouteResponse({
                text: response.text,
                rerun: true
            })
        }
        if (response.newMapping) {

            this.mapping = response.newMapping
            return new RouteResponse({
                text:response.text
            });
        }
        return new RouteResponse({
            text:response.text
        })
    }
}

module.exports = {
    Route:Route
};
