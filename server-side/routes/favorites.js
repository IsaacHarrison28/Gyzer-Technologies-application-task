const Express = require("express");
const router = Express.Router();
const favoriteMovie = require("../models/favoritemovie");

router.post("/", (req, res) => {
  const Data = new favoriteMovie({
    movieTitle: req.body.title,
    movieId: req.body.movieId,
  });

  Data.save()
    .then((doc) => {
      console.log(doc);
      res.status(201).json(doc);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
