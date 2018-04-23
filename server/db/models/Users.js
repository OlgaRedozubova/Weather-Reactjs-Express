const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    id : 'string',
    name : 'string',
    password : 'string',
    towns : 'string'
});

UsersSchema.static('findByNamePass', function (name,pass, callback) {
    return this.find({ name: name, password: pass }, callback);
});

module.exports.UsersSchema = UsersSchema;