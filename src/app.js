if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

//Use cors
app.use(express.json())
app.use(cors())

//Require routers
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

//Routes
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//Use error checks
app.use(notFound);
app.use(errorHandler);

module.exports = app;
