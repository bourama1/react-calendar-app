const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const authenticate = require("../../middleware/authenticate");

router.post("/api/task/create", authenticate, (req, res)=> {
    const task = new Task(req.body);
    task.save().then(() => {
        res.send({message: "Task created"});
    }).catch(()=>{
        res.send({message: "Error when creating task"});
    },
    );
});

router.patch("/api/tasks/:id/update", authenticate, async (req, res) => {
    const searchData = {_id: req.params.id};
    const updateOptions = {useFindAndModify: false, new: true};
    try {
        const task = await Task.findOneAndUpdate(searchData, req.body, updateOptions);
        res.send({message: "Task updated"});
        if (!task) {
            return res.status(404).send();
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/api/tasks/:id/delete", authenticate, async (req, res) => {
    const searchData = {_id: req.params.id};
    try {
        const task = await Task.findOneAndDelete(searchData);
        res.send({message: "Task deleted"});

        if (!task) {
            return res.status(404).send();
        }
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/api/tasks", authenticate, (req, res)=>{
    Task.find({}).then((projects)=> res.send(projects));
});

module.exports = router;
