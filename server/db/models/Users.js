const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    id : 'string',
    name : 'string',
    password : 'string',
    towns : 'string'
});

module.exports.UsersSchema = UsersSchema;