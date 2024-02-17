const { response } = require('express');
const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') =>{
    return new Promise((resolve, reject) =>{
        const paylod = { uid, };
        process.env.SECRETORPRIVATEKEY,
        {
            exporenIn: '1h',
        },

        (err, token) =>{

            if(err){
                console.error(err);
                reject('no se puede generar token');
            }
            else{
                resolve(token);
            }
        }

    });
}

module.exports = {
    generarJWT
}