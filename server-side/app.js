const Express = require("express");
const mongoose = require("mongoose");
const app = Express();
const retry = require("retry");
const bodyParser = require("body-parser");
const allMoviesRouter = require("./routes/get-all-movies");
const favoriteMovieRouter = require("./routes/favorites");

//connect to database
const connectWithRetry = () => {
  const operation = retry.operation({
    retries: 5,
    factor: 3,
    minTimeout: 1000,
    maxTimeout: 60000,
    randomize: true,
  });

  operation.attempt(async (currentAttempt) => {
    try {
      await mongoose.connect(
        "mongodb+srv://sateonlineservices:A2ecsVk6pmuI6L4B@testcluster.6fiffgx.mongodb.net/?retryWrites=true&w=majority"
      );
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error(
        `Error connecting to MongoDB (attempt ${currentAttempt}):`,
        err.message
      );
      if (operation.retry(err)) {
        return;
      }
    }
  });
};

// Call the connectWithRetry function
connectWithRetry();

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
