let CommandResponse = require('./command-response');

class ErrorCmd {
    go() {
        return new CommandResponse({
            error: 'Please give right input:'
        });
    }
}

module.exports = ErrorCmd;
