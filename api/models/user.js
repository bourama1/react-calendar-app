// User scheme
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({name: {type: String, unique: true, required: true}, password: {type: String, required: true, minlength: 8}, projects: [String]});
const bcrypt = require("bcryptjs");


userSchema.statics.findByCredentials = async ({name, password}) => {
    const user = await User.findOne({name});
    if (!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }
    return user;
};


const User = mongoose.model("User", userSchema);

module.exports = User;


