const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const userRouter = require("../api/routers/user");
const taskRouter = require("../api/routers/task");
const projectRouter = require("../api/routers/project");


// Mongoose initialization
mongoose.connect("mongodb://localhost:27017/owe");
console.log("DB initialize");

const app = express();

// eslint-disable-next-line no-undef
sessionConfiguration = {
    secret: "very long word",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxage: 1000 * 60 * 60 * 24 * 7,
    },
};

// eslint-disable-next-line no-undef
app.use(session(sessionConfiguration));
app.use(express.json());
const port = 3001;
app.use(userRouter);
app.use(taskRouter);
app.use(projectRouter);
app.listen(port, () => {
    console.log("Server started");
});
