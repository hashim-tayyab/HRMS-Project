const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");


// const passport = require('passport');
// const {initializingPassport} = require("../../utility/passportConfig");
// initializingPassport(passport);
// app.use(passport.initialize());

require("dotenv").config();
const {connectMongoose} =  require("./config/db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// require("./sendgrid/sendgrid");

connectMongoose();
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started. Listening to PORT: ${process.env.PORT}`);
})




   