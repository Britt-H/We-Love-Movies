const knex = require("../db/connection");
const reduceP = require("../utils/reduce-properties");

//creates array of movie objects with required properties
//chain on to list function
const reduceMovies = reduceP("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
});

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .then(reduceMovies)
}

module.exports = {
    list,
};