function log( req, res, next ) {
    console.log('Request from: ', req.url);
    next();
}

module.exports = log;