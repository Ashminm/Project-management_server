const mongoose = require("mongoose");

const connectionString = process.env.DATABASE;

mongoose
    .connect(connectionString)
    .then(() => {
        console.log("MongoDB Server is Connected!!!");
    })
    .catch((rej) => {
        console.log("MongoDB connection faild", rej);
    });
