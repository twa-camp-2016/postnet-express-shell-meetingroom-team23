class CommandResponse {
    constructor({error, text, reset, newMapping}){
        this.error = error;
        this.text =text;
        this.reset = reset;
        this.newMapping = newMapping;
    };
}

module.exports = CommandResponse;