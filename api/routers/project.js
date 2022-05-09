const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Project = require("../models/project");
const authenticate = require("../middleware/authenticate");


router.post("/api/project/create", authenticate, (req, res)=> {
    const project = new Project(req.body);
    project.save().then(() => {
        res.send({message: "Project created"});
    }).catch(()=>{
        res.send({message: "Error when creating project"});
    },
    );
});


router.patch("/api/projects/:id/update", authenticate, async (req, res) => {
    const searchData = {_id: req.params.id};

    try {
        const project = await Project.findOne(searchData);
        const user = await User.findOne({_id: req.body.user});

        if (req.body.action==="Add"&&project.users.indexOf(req.body.user)===-1) {
            project.users.push(req.body.user);
            user.projects.push(searchData);
        }

        if (req.body.action==="Remove") {
            for ( let i = 0; i < project.users.length; i++) {
                if (project.users[i]===req.body.user) {
                    project.users.splice(i, 1);
                }
            }

            for ( let i = 0; i < user.projects.length; i++) {
                if (user.projects[i]===req.params.id) {
                    user.projects.splice(i, 1);
                }
            }
        }
        project.save();
        user.save();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/api/projects", authenticate, (req, res)=>{
    Project.find({}).then((projects)=> res.send(projects));
});

module.exports = router;
