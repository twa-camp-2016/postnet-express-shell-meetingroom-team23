/**
 * Created by SONY on 2016/8/4.
 */
class CommandResponse{
    constructor({error,text,reset,newmapping}){
        this.error = error;
        this.text = text;
        this.reset = reset;
        this.newmapping = newmapping;
    }
}
module.exports = CommandResponse;