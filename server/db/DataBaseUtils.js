//const Users from "../../client/src/containers/Users";

const mongoose = require("mongoose");
const mongoUri = require("../config/consts").mongoUri;
const UsersSchema = require('./models/Users').UsersSchema;
const Users = mongoose.model('Users', UsersSchema);

exports.setUpConnection = () => {
    mongoose.connect(mongoUri);
};


exports.listUsers = () => {
    return Users.find();
};

exports.createUser = (data) =>{
    const user = new Users({
        id: data.id,
        name: data.name,
        password: data.password,
        towns: data.towns
    });
    return user.save();
};

exports.deleteUser = (id) => {
    return Users.findById(id).remove();
};

exports.findUserByName = (username, password) => {
    console.log('findUserByName', username, password);
    return Users.findByNamePass(username, password);
};

module.exports;