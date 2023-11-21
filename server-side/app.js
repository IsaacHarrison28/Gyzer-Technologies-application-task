const Express = require("express");
const app = Express();
const port = process.env.PORT || 5000;
const allMoviesRouter = require("./routes/get-all-movies");

app.use("/movies", allMoviesRouter);

app.listen(() => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
