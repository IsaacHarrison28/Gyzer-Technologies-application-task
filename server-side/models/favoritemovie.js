const { Schema, model } = require("mongoose");

const favoriteMovieSchema = new Schema({
  movieTitle: String,
  movieId: String,
});

module.exports = model("favoriteMovie", favoriteMovieSchema);
