import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOT_REVIEWS = "/reviews/load";
const POST_REVIEWS = "/reviews/post";
const LOAD_ALL_USER_REVIEWS = "/reviews/user";
const DELETE_REVIEWS = "/reviews/delete";

//actions
const loadAllSpotReviews = (reviews) => {
    return {
        type: LOAD_ALL_SPOT_REVIEWS,
        reviews
    }
}

const postReview = (review) => {
    return {
        type: POST_REVIEWS,
        review
    }
}

const loadAllUserReviews = (reviews) => {
    return {
        type: LOAD_ALL_USER_REVIEWS,
        reviews
    }
}

const deleteReview = (id) => {
    return {
        type: DELETE_REVIEWS,
        id
    }
}

//thunks

// load all spot reviews thunk
export const loadSpotReviewsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/reviews")
    if(response.ok) {
        const allReviews = await response.json();
        dispatch(loadAllSpotReviews(allReviews))
        return allReviews
    }
    return response
};

// Create review thunk

export const createReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${spotId}/create`, {
        method: "POST",
        body: JSON.stringify(review)
    });
    if(response.ok) {
        const newReview = await response.json();
        dispatch(postReview(newReview));
        return newReview;
    }
    return response;
};

//load all User's reviews

export const getAllUserReviews = () => async (dispatch) => {
    const response = await csrfFetch("/api/reviews/current-user-review");
    if(response.ok) {
        const userReviews = await response.json();
        dispatch(loadAllUserReviews(userReviews));
        return userReviews
    }
    return response;
}

// Delete a review

export const deleteReviewThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE"
    })
    if(response.ok) {
        const deletedReview = await response.json();
        dispatch(deleteReview(deletedReview));
        return dispatch;
    }
    return response;
}

//review reducer
const initialState = {}
const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ALL_SPOT_REVIEWS: {
            const newState = {};
            action.reviews.forEach(reviews => newState[reviews.id] = reviews);
            let reviews = {reviews}
            return reviews
        };
        case POST_REVIEWS: {
            let newState = { ...state };
            newState[action.review.id] = action.review;
            return newState
        };
        case LOAD_ALL_USER_REVIEWS: {
            const newState = {};
            action.reviews.forEach(reviews => newState[reviews.id] = reviews)
            return newState
        };
        case DELETE_REVIEWS: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer
