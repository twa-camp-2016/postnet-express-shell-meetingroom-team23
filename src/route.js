"use strict";

let GoToMainPageCommand = require('../commands/go-to-main-page-command');
let RouteResponse = require('./route-response');

let defaultMapping = {
    "*":new GoToMainPageCommand()
};

class Route {
    constructor() {
        this.mapping = defaultMapping;
    }

    run(input) {
        let command = this.mapping[input] || this.mapping["*"];
        let response = command.run(input);

        if (response.reset) {
            this.mapping = defaultMapping;
            return new RouteResponse({
                text: response.text,
                rerun: true
            })
        }

        if (response.error) {
            return new RouteResponse({
                text:response.error
            })
        }

        if (response.newMapping) {
            this.mapping = response.newMapping;
            return new RouteResponse({
                text:response.text
            })
        }
        return new RouteResponse({
            text:reponse.text
        })
    }
}
module.exports = Route;