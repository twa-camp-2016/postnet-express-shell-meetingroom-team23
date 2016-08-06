/**
 * Created by SONY on 2016/8/3.
 */
let GotoMainPage = require("./commands/goto-main-page-command");
let RouteResponse = require("./commands/route-response");
let gotomainpage = new GotoMainPage();
const defaultMapping = {
    "*": gotomainpage.do
};
class Route {
    constructor() {
        this.mapping = defaultMapping;
    }

    do(input) {
        let command = this.mapping[input] || this.mapping["*"];
        let response = command(input);

        if (response.error) {
            return new RouteResponse({
                text: response.error
            })
        }
        if (response.reset) {
            this.mapping = defaultMapping;
            return new RouteResponse({
                text: response.text,
                rerun: true
            })
        }
        if (response.newmapping) {
            this.mapping = response.newmapping;
            return new RouteResponse({
                text: response.text
            })
        }
        return new RouteResponse({
            text: response.text
        })
    }
}

module.exports = Route;
