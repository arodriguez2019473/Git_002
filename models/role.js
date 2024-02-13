const{ Schema, model } = require('mongoose');

const RoleSchema = Schema ({

    role:{
        type: String,
        require: [true, 'el Role es obligatorio']
    }
});

module.exports = model('Role', RoleSchema);