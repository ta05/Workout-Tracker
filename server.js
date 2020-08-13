require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

let uri = "mongodb://localhost/fitness";
if (process.env.NODE_ENV === "production")
    uri = process.env.MONGODB_URI;

console.log(uri);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false
});

// routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});