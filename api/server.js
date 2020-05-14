const express = require("express");
const itemsRouter = require("./routes/itemsRouter");

const server = express();

server.use(express.json());
server.use("/items", itemsRouter);

// Fallback server error message
server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Somthing went wrong",
    });
});

module.exports = server;
