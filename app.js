require("dotenv").config();

const express = require("express"),
      bodyParser = require("body-parser"),
      app = express(),
      cors = require("cors"),
      errorhandler = require("./error"),
      authroutes = require("./routes/authroutes"),
      mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authroutes);

app.use(function(req, res, next){
    let err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use(errorhandler);

app.listen(4545, () => {
    console.log("server 4545 is serving currently");
});