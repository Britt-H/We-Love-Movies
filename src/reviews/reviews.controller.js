const reviewService = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
  
    const review = await reviewService.read(reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ status: 404, message: `Review cannot be found.` });
}

async function read(req, res) {
    const {movieId} = req.params;
    //List reviews
    const data = await reviewService.list(movieId);

    //Access first entry
    data.map((review, indx)=>{
        return review.critic = review.critic[0]
    });

    //Return single entry
    res.json({ data });
}

async function update(req, res) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    
    const criticId = updatedReview.critic_id;
    const critic = await reviewService.readCritic(criticId);

    await reviewService.update(updatedReview);

    const update = await reviewService.read(res.locals.review.review_id);

    const data = update;
    data.critic = critic;

    res.json({ data });
}

async function destroy(req, res) {
    const { reviewId } = req.params
    await reviewService.delete(reviewId);
    res.sendStatus(204);
}

module.exports = {
    read: [asyncErrorBoundary(read)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};