const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");

require("dotenv").config();
const {connectMongoose} =  require("./config/db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);

connectMongoose();
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started. Listening to PORT: ${process.env.PORT}`);
})
   