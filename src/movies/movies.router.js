const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const theaterRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router")

router
  .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
  .route(`/:movieId`)
    .get(controller.read)
    .all(methodNotAllowed);

//Nested Routes
router.use("/:movieId/theaters", theaterRouter)
router.use("/:movieId/reviews", reviewsRouter)

module.exports = router;