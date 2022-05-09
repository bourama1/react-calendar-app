// Task scheme
const mongoose = require("mongoose");
const Task = mongoose.model("Task", {name: {type: String, required: true}, importance: {type: String, required: true}, description: {type: String, required: true}, isCompleted: {type: String, required: true}, deadline: {type: String, required: true}, project: {type: String, required: true}});


module.exports = Task;
