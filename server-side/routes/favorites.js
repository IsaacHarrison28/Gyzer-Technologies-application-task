const Express = require("express");
const router = Express.Router();
const favoriteMovie = require("../models/favoritemovie");

router.get("/", (req, res) => {
  favoriteMovie
    .find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        Error: "couldn't get the resources",
        Message: error,
      });
    });
});

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
      res.status(500).json({
        Error: "Error prevented the operation",
        Message: error,
      });
      console.log(error);
    });
});

module.exports = router;
