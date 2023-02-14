import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllUserReviews } from "../../store/reviews";
import { deleteReviewThunk } from "../../store/reviews";
import "./userReviews.css";

function UserReviews() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsloaded] = useState(false);
  const reviews = useSelector((state) => {
    return Object.values(state.reviews);
  });
  useEffect(() => {
    dispatch(getAllUserReviews()).then(() => setIsloaded(true));
  }, [dispatch, JSON.stringify(reviews)]);

  const handleDeleteClick = (reviewId) => async (e) => {
    e.preventDefault();
    const response = dispatch(deleteReviewThunk(reviewId));
    dispatch(getAllUserReviews())
    if (response) {
      history.push(`/spots/currentUser/reviews`);
    }
  };


  return (
    isLoaded && (
      <div className="reviewsContainer">
        <div className="myReviews" style={{marginTop: "20px"}}>
          <div className="reviewTitle">{reviews?.length > 0 ? "My Reviews" : "No Reviews"}</div>
          <div className="eachContainer">
          {reviews?.map((review) => (
            <div key={review.id} className="eachReview">
              <div style={{marginTop: "2px", marginBottom: "2px"}}>My Comment: {review.review}</div>
              <div style={{marginTop: "2px", marginBottom: "2px"}}>Stars: {review.stars}</div>
              <NavLink className="spot-link" style={{color: "#ff385c"}} to={`/spots/${review.spotId}`}>Link to this Review</NavLink>
              <div>
                <button className="deleteReview" onClick={handleDeleteClick(review.id)}>
                  Delete this Review
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    )
  );
}

export default UserReviews;
