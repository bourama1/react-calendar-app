/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const projectRouter = require("./routers/project");
const cors = require("cors");
const path = require("path");

// Mongoose initialization
mongoose.connect("mongodb://localhost:27017/owe");
console.log("DB initialize");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, "build")));

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
app.use(userRouter);
app.use(taskRouter);
app.use(projectRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log("Server running on port:" + port);
});
