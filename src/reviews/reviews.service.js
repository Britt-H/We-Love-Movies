const knex = require("../db/connection");
const reduce = require("../utils/reduce-properties");

//Critic Objects array with required props
//Add on to list
const reduceCritics = reduce("review_id", {
    critic_id: ["critic", null, "critic_id"],
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
    created_at: ["critic", null, "created_at"],
    updated_at: ["critic", null, "updated_at"]
});

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
    return knex("reviews")
        .join("critics", "critics.critic_id", "reviews.critic_id")
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