const jwt = require('jsonwebtoken');

const generarJWT = (uid, role) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, role };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject('No se puede generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generarJWT
};
