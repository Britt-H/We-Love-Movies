const knex = require("../db/connection");

async function list(is_showing) {
  return knex("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if(is_showing){
        //Join on movie_id between movies & movies_theaters
        queryBuilder.join("movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          //Where is_showing is true
          .where({"movies_theaters.is_showing": true})
          //Group on movie_id
          .groupBy("movies.movie_id");
      }
    });
}

//Retrieve first entry based movie_id
async function read(movie_id){
  return knex("movies").where({movie_id}).first()
}

module.exports = {
  list,
  read,
};