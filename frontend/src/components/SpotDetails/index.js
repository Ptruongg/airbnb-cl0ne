import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllSpots, deleteSpotId } from "../../store/spots";
import { getAllUsers } from "../../store/user";
import { loadSpotReviewsThunk } from "../../store/reviews";
import CreateReviews from "./createReviews";

import "./spotDetails.css"

const SpotDetails = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spotState = useSelector((state) => state.spots)
    const userState = useSelector((state) => state)
    const sessionUser = useSelector((state) => state.session.user)
    const spot = spotState[spotId]
    const reviews = useSelector((state) => Object.values(state.reviews));
    const users = useSelector((state) => state.users);
    const [isLoaded, setIsLoaded] = useState(false);
    const spotsString = JSON.stringify(spot);
    const reviewsString = JSON.stringify(reviews);
    const usersString = JSON.stringify(users);
    const user = useSelector((state) => Object.values(state.users));
    // console.log('this is the spot state', spotState);
    // console.log('SPOT', spot)
    // console.log('users', userState)
    useEffect(() => {
        getAllSpots(dispatch);
    }, [dispatch, JSON.stringify(spotState)])

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch, JSON.stringify(userState)])

    useEffect(() => {
        dispatch(loadSpotReviewsThunk());
    }, [dispatch, reviewsString]);

    const editSpot = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/edit`)
    }

    const spotDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpotId(spotId));
        history.push('/')
    }

    const handleCreateReview = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/createReview`);
    };

    let spots = spot[spotId];
    const allReviewsForThisSpot = reviews.filter((review) => {
        return review.spotId === spotId;
    });
    let allStars = 0;
    (allReviewsForThisSpot || []).forEach((review) => {
        allStars += review.stars;
    });
    const avgStarRating = allStars / allReviewsForThisSpot.length;

    const userReviewForThisSpot = reviews.filter((review) => {
        if (!sessionUser) {
            return [];
        } else {
            return review.userId === sessionUser.id && review.spotId === spotId;
        }
    });

    const fetchNameById = (userId) => {
        if (!users[userId]) {
            return "";
        } else {
            const firstName = users[userId].firstName;
            return firstName;
        }
    };

    const spotsUser = user.filter((use) => {
        return use.id === spots?.ownerId;
    });
    return (
        spot && (
            <>
                <div className="spotIdDetails">
                    <div className="spotTitle">
                        <div> {spot?.name} </div>
                        <div> {spot?.avgRating}, {spot.city}, {spot.state}, {spot.country} </div>
                    </div>
                    <div className="spotPictures">
                        <img className="spotImg" src={spot.previewImage}></img>
                    </div>
                    <div className="spotDescription">
                        <div> {spot.description} </div>
                    </div>
                    <div className="reviewCount">
                        {allReviewsForThisSpot.length} Review(s)
                    </div>

                    {sessionUser && sessionUser.id === spot.ownerId &&
                        (<div className="editDeleteButtons">
                            <button onClick={editSpot}>
                                Edit
                            </button>
                            <button onClick={spotDelete}>
                                Delete
                            </button>
                        </div>)}
                    <div>
                        <CreateReviews />
                    </div>
                </div>
            </>
        )

    )
}

export default SpotDetails;
