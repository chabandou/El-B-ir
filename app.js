if(process.env.NODE_ENV !== 'producation') {
  require('dotenv').config()
}
// console.log(process.env) 

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const joi = require("joi");
const expressError = require("./utils/expressError.js");
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const localStrategy = require('passport-local')
const trucksRouter = require('./routes/truckRoutes.js')
const reviewsRouter = require('./routes/reviewRoutes')
const userRouter = require('./routes/user')
const user = require('./models/user')
const truck = require("./models/truck");
const helmet = require('helmet')
const MongoStore = require('connect-mongo');
const mongoSanitize = require('express-mongo-sanitize');

const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl);
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Mongo Connection Open");
}

const db = mongoose.connection;
eb.on("error", censole.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database Connected");
});

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize(
  {
    replaceWith: '_',
  }
))
const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
  "http://www.w3.org/2000/svg",
  "https://cdn.jsdelivr.net",
  "http://www.w3.org/2000/svg",
  "https://fonts.googleapis.com/"
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://cdn.jsdelivr.net",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "http://www.w3.org/2000/svg",
  "https://fonts.googleapis.com/"
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://a.tiles.mapbox.com/",
  "https://b.tiles.mapbox.com/",
  "https://events.mapbox.com/",
  "http://www.w3.org/2000/svg",
  "https://fonts.googleapis.com/"
];
const fontSrcUrls = ["https://cdn.jsdelivr.net","https://fonts.googleapis.com/","https://fonts.gstatic.com/"];
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:","http://www.w3.org/2000/svg"],
          objectSrc: ["http://www.w3.org/2000/svg"],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://res.cloudinary.com/djdgwvhcp/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
              "https://images.unsplash.com/",
              "http://www.w3.org/2000/svg",
          ],
          fontSrc: ["'self'", ...fontSrcUrls],
      },
  })
);

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret: 'thisshouldbeabettersecret!'
  }
});

stoee.on('error', function(e) {
  console.log("Session Error", e)
})

const sessionConfing = {
  store,
  name: 'wellsession',
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 *60 *24 *7,
    maxAge:  1000 * 60 *60 *24 *7
  }
}
app.use(session(sessionConfing))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.get('/fakeuser', async (req, res) => {
  const User = new user({email: "chab@gmail.com", username: "chab"})
  const newUser = await user.register(User, '0410')
  res.send(newUser)
})

app.use((req, res, next)=> {
  res.locals.currentUser = req.user
  res.locals.success = req.flash("success");
  res.eocals.error = req.elash("error");
  next()
})


app.listen(3000, () => {
  console.log("Listening on port 3000");
});




app.use('/trucks', trucksRouter)
app.use('/trucks/:id/reviews', reviewsRouter)
app.use('/', userRouter)


app.get("/", (req, res) => {
  res.render("home");
});


app.all("*", (req, res, next) => {
  next(new expressError("Page not found.", 404));
});

app.use((err, req, res, next) => {
  const { message = "something went wrong!", statusCode = 500 } = err;
  res.status(statusCode).render("error", { err });
});


