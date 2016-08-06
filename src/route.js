let {
    promptCommand
} = require('../src/commands');
const flags = {
    '*': promptCommand
};

let mapping = flags;

class Route {
    route(inputs) {
        let command = mapping[inputs] || mapping['*'];
        let aa = new command;
        let response = aa.translate(inputs);
        if (response.newMapping) {
            mapping = response.newMapping;
            return {
                text: response.text
            }
        } else if (response.reset) {
            mapping = flags;
            return {
                text: response.text,
                rerun: true
            }
        } else if (response.error) {
            return {text: response.error}
        } else {
            return {text: response.text}
        }
    }
}


module.exports = {
    Route
};
