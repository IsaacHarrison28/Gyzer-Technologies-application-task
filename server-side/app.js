const Express = require("express");
const app = Express();
const cors = require("cors");
const allMoviesRouter = require("./routes/get-all-movies");

//handle CORS errors
app.use(cors());
app.use(Express.json());

app.use("/movies", allMoviesRouter);

module.exports = app;
