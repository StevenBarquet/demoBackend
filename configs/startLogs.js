const debug = require('debug')('dev') // remember to set DEBUG=dev
const name = 'Rick-and-Morty-express-app';

function startLogs(port) {
    debug('------- %o ------\n', name);
    debug('Listening to port ' + port + '...\n');
}

module.exports = startLogs;