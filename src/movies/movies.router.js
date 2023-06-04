//route 1
// /movies
//list all movies

//route 2
// /movies?is_showing=true
//list all movies where is_showing=true
//join against movies_theaters table

//Routes 3-6
//display specific movie based on ID
// /movies/:movieId

//If doesn't exist 404 error stating "Movie cannot be found"
// /movies/:movieId (incorrect ID)

//All theaters movie is playing in, will involve join with movies_theaters
// /movies/:movieId/theaters

//All reviews for specific movie, view specifics for return formatting in movies_read
// /movies/:movieId/reviews

const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

router
    .route("/")
    .get(controller.read)

module.exports = router