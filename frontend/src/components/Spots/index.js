import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { loadSpotReviewsThunk } from "../../store/reviews";
import "./spots.css";

// import spot = require("../../../../backend/db/models/spot");

const AllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state?.spots));
  const sessionUser = useSelector((state) => state.session.user)
  const reviews = useSelector((state) => Object.values(state?.reviews));
  // const reviewsString = JSON.stringify(reviews)
  useEffect(() => {
    getAllSpots(dispatch);
  }, [dispatch, JSON.stringify(spots)]);


  useEffect(() => {
    dispatch(loadSpotReviewsThunk());
  }, [dispatch, sessionUser]);

  const starSpot = (spotId) => {
    const allReviewsForThisSpot = reviews.filter((review) => {
      return review.spotId === spotId;
    });
    let allStars = 0;
    allReviewsForThisSpot.forEach((review) => {
      allStars += review.stars;
    });
    const avgStarRating = allStars / allReviewsForThisSpot.length;
    return avgStarRating ? avgStarRating.toFixed(2) : "New";
  };
  return (
    <div className="spotsPage">
      <div className="eachSpot">
        {spots &&
          spots.map((spot) => (
            <div className="spotCard" key={spot.id}>
              <NavLink to={`/spots/${spot.id}`}>
                <div className="room">
                  {spot.previewImage && (
                    <div className="imgDiv">
                      <img className="spotImg" src={spot.previewImage} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                      }}></img>
                    </div>
                  )}
                  <div className="spotName">
                    {spot.name}
                  </div>
                  <div className="roomDetails">
                    <div className="roomData">
                      <div className="spotLocation">
                        <div>
                          {spot.city}, {spot.state}
                        </div>
                        <div className="spotStars">
                          <div className="star">
                            <i className="fa-solid fa-star star-design"></i>
                            {starSpot(spot.id)}
                          </div>
                        </div>
                      </div>
                      <div className="spotDistance">{`${Math.floor(
                        Math.random() * 100 + 200
                      )
                        .toString()
                        .replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )} miles away`}</div>

                      <p className="spotPrice"> <b>${spot.price}</b>&nbsp;night</p>
                    </div>

                  </div>
                </div>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllSpots;
