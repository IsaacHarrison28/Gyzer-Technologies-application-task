const { Schema, model } = require("mongoose");

const favoriteMovieSchema = new Schema({
  movieId: String,
  movieCoverPhoto: String,
  movieTitle: String,
});

module.exports = model("favoriteMovie", favoriteMovieSchema);
