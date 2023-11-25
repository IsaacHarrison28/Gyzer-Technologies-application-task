const Express = require("express");
const router = Express.Router();
const fetch = require("node-fetch");
const auth = require("../secrets/authorization");
const favoriteMovie = require("../models/favoritemovie");

//if a movie is both in the api list and database list, it should have a new favorite: true added to the object
//and this can be added to the

router.get("/", (req, res, next) => {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: auth,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then(async (nowPlayingList) => {
      //loop through the movies to check for favorite movies
      for (let i = 0; i < nowPlayingList.results.length; i++) {
        let favorite = await isFavorite(
          JSON.stringify(nowPlayingList.results[i].id)
        );

        //check if it is a favorite movie
        if (favorite) {
          nowPlayingList.results[i].favorite = true;
        } else {
          nowPlayingList.results[i].favorite = false;
        }
      }

      //return the values with a favorite field added to each movie
      res.status(200).json(nowPlayingList);
    })
    .catch((err) => {
      res.status(500).json({
        Error: {
          message: "Error occured on fetching now playing movies",
          err: err,
        },
      });
    });
});

async function isFavorite(id) {
  const favorites = await favoriteMovie
    .find()
    .then((useFavs) => {
      return useFavs;
    })
    .catch((error) => {
      console.log(error);
    });

  let findFavorites = favorites.find((movie) => movie.movieId === id);

  if (findFavorites) {
    return true;
  } else {
    return false;
  }
}

module.exports = router;
