let CommandResponse = require('./response-command');
class Error{
    error(){
        return new CommandResponse({error: 'Please give right input'});
    }
}
module.exports = Error;