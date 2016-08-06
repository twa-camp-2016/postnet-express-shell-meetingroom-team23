
class CommandResponse {
    constructor({text,error,reset,newMapping}){
        this.text = text;
        this.error = error;
        this.reset = reset;
        this.newMapping = newMapping;
    }
}

module.exports = CommandResponse;