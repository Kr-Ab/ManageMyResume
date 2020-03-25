const express       = require("express");
const path          = require("path");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const passport      = require("passport");
const mongoose      = require("mongoose");
const config        = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log("Connected to database " + config.database)
})

mongoose.connection.on('err', (err) => {
    console.log("Database Connection error" + err)
})

const app = express();
const users = require('./routes/users');

app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
})

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => {
    console.log("Server started on port: " + port);
})