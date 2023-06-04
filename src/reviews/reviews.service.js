const knex = require("../db/connection");

//-------- use these for list function( path: /movies/:movieId/reviews)---------

const reduceP = require("../utils/reduce-properties");

//creates critic object with required properties
const reduceCritics = reduceP("review_id", {
    critic_id: ["critic", null, "critic_id"],
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
    created_at: ["critic", null, "created_at"],
    updated_at: ["critic", null, "updated_at"]
});

//----------------------------------------------------

function read(reviewId) {
    return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function readCritic(criticId){
    return knex("critics").select("*").where({critic_id: criticId}).first();
}

function update(updatedReview) {
      return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*");
}

function destroy(reviewId) {
    return knex("reviews").where({review_id: reviewId}).del();
}

function list(movieId){
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("*").where({movie_id: movieId})
        .then(reduceCritics);
}

module.exports = {
    list,
    read,
    readCritic,
    update,
    delete: destroy,
};