const Express = require("express");
const router = Express.Router();
const favoriteMovie = require("../models/favoritemovie");

router.get("/", (req, res, next) => {
  favoriteMovie
    .find()
    .exec()
    .then((doc) => {
      console.log(doc);
      res.json(doc);
    })
    .catch((error) => res.status(500).json(error));
});

router.post("/", (req, res, next) => {
  const favorite = new favoriteMovie({
    movieTitle: req.body.title,
    movieId: req.body.movieId,
  });

  favorite
    .save()
    .then((movie) => {
      console.log(movie);
      res.status(201).json({
        status: "created",
        movie: movie,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
