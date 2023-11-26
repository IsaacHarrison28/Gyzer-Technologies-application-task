const Express = require("express");
const router = Express.Router();
const mongoose = require("mongoose");
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
    movieCoverPhoto: req.body.coverImage,
    movieId: req.body.movieId,
  });

  Data.save()
    .then((doc) => {
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

router.delete("/", (req, res) => {
  try {
    const id = req.body.movieId;
    favoriteMovie
      .findByIdAndDelete(id)
      .exec()
      .then((deletedItem) => {
        console.log("Sucessfully deleted the item");
        res.status(200).json({
          Message: "Successfully deleted the movie",
          movie: deletedItem,
        });
      })
      .catch((error) => {
        res.status(500).json({
          Message: "could not delete the movie",
          Error: error,
        });
      });
  } catch (error) {
    res.status(500).json({
      Error: "could not delete movie",
      Message: error,
    });
  }
});

module.exports = router;
