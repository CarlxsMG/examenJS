var encrypt = require('bcryptjs')

function encryptPass(pass) {
    const salt = encrypt.genSaltSync();
    const hash = encrypt.hashSync(pass, salt);
    
    return hash;
}

function checkPass(pass1, pass2) {
    if(encrypt.hashSync(pass2, pass1.split('$')[1]) == pass1) {
        console.log('Contraseña validada')
        return true
    }
    
    return false
}

module.exports = {encryptPass, checkPass}