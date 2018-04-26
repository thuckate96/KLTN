var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require("path");
var port = process.env.PORT|| 3000;
var session = require("express-session");
 
// var db = require("./models/mydatabase.js")
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('trust proxy', 1);
app.use(session({
  secret: "gdfghoaigfdjptertaertarpfjdg",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
var chatRouter = require("./routers/chatRealTime");
app.use("/message", chatRouter);

var homeRouter = require("./routers/homeRouter");
app.use("/", homeRouter);



var http = require("http").Server(app);
var io = require("socket.io")(http);

require("./routers/iochat")(io);
http.listen(port, ()=>{
  console.log("Server listening on port "+port);
})
