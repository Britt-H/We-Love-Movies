const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middleware function. checks if movie exists
async function movieExists(req, res, next){
  const movie = await service.read(req.params.movieId);
  if(movie){
    res.locals.movie = movie;
    return next()
  }
  next({status:404, message: 'not found'})
}

async function list(req, res) {
  const data = await service.list(req.query.is_showing);
  res.json({ data });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read]
};