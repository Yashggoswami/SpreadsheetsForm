require("dotenv").config();
require("rootpath")();

const path = require("path"),
  bodyParser = require("body-parser"),
  express = require("express"),
  app = express(),
  session = require("express-session"),
  flash = require("express-flash"),
  hbs = require("hbs"),
  cors = require("cors");

// -------------------Let this code be on the Top----------------------
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret:process.env.SECRET,
    cookie: { secure: false, maxAge: 14400000 },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
// -------------------Let this code be on the Top----------------------
app.use(express.static("src/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", "src/views/partials");
hbs.registerPartials("./src/views/partials");

// Send data with res.redirect()
// app.use(flash());

// global error handler
app.use(cors());

app.use(require("index"));

const PORT = process.env.PORT||5000;
app.listen(PORT, () =>
  console.log(
    `Server running on http://localhost:${PORT}`
  )
);
