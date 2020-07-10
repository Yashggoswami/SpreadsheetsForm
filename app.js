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
    secret: process.env.SECRET,
    cookie: { secure: false, maxAge: 14400000 },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
// -------------------Let this code be on the Top----------------------

app.use(bodyParser.urlencoded({ extended: true }));


hbs.registerPartials("src/views/partials");

// Send data with res.redirect()
app.use(flash());

// global error handler
app.use(errorHandler);
app.use(cors());

app.use(require("./index"));

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(
    `Server running on http://localhost:${PORT}`
  )
);
