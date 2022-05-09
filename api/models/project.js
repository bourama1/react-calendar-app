const mongoose = require("mongoose");
const Project = mongoose.model("Project", {name: {type: String, unique: true, required: true}, users: [String]});
module.exports = Project;
