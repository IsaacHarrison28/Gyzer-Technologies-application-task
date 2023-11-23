const Express = require("express");
const mongoose = require("mongoose");
const app = Express();
const cors = require("cors");
const bodyParser = require("body-parser");
const allMoviesRouter = require("./routes/get-all-movies");
const favoriteMovieRouter = require("./routes/favorites");

//connect to database
mongoose.connect(
  "mongodb+srv://sateonlineservices:A2ecsVk6pmuI6L4B@testcluster.6fiffgx.mongodb.net/?retryWrites=true&w=majority"
);

//handle CORS errors
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //The * allows any url to access our API but if you want
  //to explicitly allow a certain url only, add it in place of * and it'll allow only that url
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, DELETE, POST, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/movies", allMoviesRouter);
app.use("/favorite", favoriteMovieRouter);

module.exports = app;
