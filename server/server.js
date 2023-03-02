const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use (express.urlencoded({extended:true}))

 // app.use('/', express.static('client'));
app.use('/', server);
  

app.listen(3000, () => {
    console.log("Server started on http://127.0.0.1:3000");
});

