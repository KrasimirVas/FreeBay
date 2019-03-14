const verifyAndDecodeJWT = require('./decodeToken');

function verifyJWT(req, res, next) {
    let token = req.headers['authorizaton'];

    verifyAndDecodeJWT(token)
        .then(decodedToken => {
            req.user = decodedToken;
            next()
        })
        .catch(err => {
            res.status(400).json({
                error: 'You dont have permissions!'
            })
        });
}

module.exports = verifyJWT;