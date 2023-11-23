const Express = require("express");
const router = Express.Router();
const fetch = require("node-fetch");
const auth = require("../secrets/authorization");

//connect to database

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
    .then((nowPlayingList) => {
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

module.exports = router;

//3PHIObcbov5RsFuf

//mongodb+srv://sateonlineservices:<password>@cluster0.bdn2lem.mongodb.net/?retryWrites=true&w=majority
