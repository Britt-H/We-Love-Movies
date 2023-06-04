if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")

//import error checks
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

//parse json and use cors
app.use(express.json())
app.use(cors())

//require routers
// const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
// const theatersRouter = require("./theaters/theaters.router");

//direct routes to required routers
// app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
// app.use("/theaters", theatersRouter);

//run errors checks
app.use(notFound);
app.use(errorHandler);

module.exports = app;
