require("dotenv").config();

const express = require("express");

const cors = require("cors");

const pfServer = express();

require("./dbConnection/connection");

const middleeare=require('./Middlewares/usermiddleware')

pfServer.use(middleeare)

pfServer.use(cors());

pfServer.use(express.json());

const router = require("./Routes/router");

pfServer.use(router);

const PORT = 4000 || process.env.PORT;

pfServer.use('/upload',express.static('./uploads'))

pfServer.listen(PORT, () => {
    console.log("Server is started at :", PORT);
});

pfServer.get("/", (req, res) => {
    res.send("<h1>Server is successfully Running!!!</h1>");
});

pfServer.post("/", (req, res) => {
    res.send("<h1>POST request receved!!!</h1>");
});
