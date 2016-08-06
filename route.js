"use strict";
let goToMenuPage = require('../main/command');

let defaultMapping = {
    '*': goToMenuPage
};

class RouteResponse {
    constructor({err, text}) {
        this.err = err;
        this.text = text;
    }
}

class Route {
    constructor() {
        this.mapping = defaultMapping;
    }

    handle(input) {
        let command = this.mapping[input] || this.mapping['*'];
        let sentence = new command();
        let response = sentence.run(input);

        if (response.err) {
            return new RouteResponse({text: response.err});
        }
        if (response.newMapping) {
            this.mapping = response.newMapping;
            return new RouteResponse({text: response.text});
        }
        if (response.reset) {
            this.mapping = defaultMapping;
            return new RouteResponse({text: response.text});
        }
    }
}


module.exports = Route;