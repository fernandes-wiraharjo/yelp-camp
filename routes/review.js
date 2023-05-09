const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

router.get('/:reviewId', (req, res) => {
    const { id } = req.params;
    res.redirect(`/campgrounds/${id}`);
})

module.exports = router;
