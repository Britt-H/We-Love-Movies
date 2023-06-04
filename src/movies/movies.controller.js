const reviewsService = require("./reviews.service.js")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await reviewsService.read(reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ status: 404, message: `Review cannot be found.` });
}

async function read(req, res) {
    const {movieId} = req.params;
    const data = await reviewsService.list(movieId);

    //access first element/object of 'critic' properties array.
    data.map((review, indx)=>{
        return review.critic = review.critic[0]
    });

    res.json({ data });
}

async function update(req, res, next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    
    //Store Data from critic table
    const criticId = updatedReview.critic_id;
    const critic = await reviewsService.readCritic(criticId);

    //update review
    await reviewsService.update(updatedReview);

    //read updated review
    const update = await reviewsService.read(res.locals.review.review_id);

    //set data to the updated review, inject critic data as critic property 
    const data = update;
    data.critic = critic;

    res.json({ data });
}

async function destroy(req, res, next) {
    const { reviewId } = req.params
    const data = await reviewsService.delete(reviewId);
    res.sendStatus(204);
}

module.exports = {
    read: [asyncErrorBoundary(read)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}