import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
// import { loadAllReviewsThunk } from "../../store/reviews";
import "./spots.css";

// import spot = require("../../../../backend/db/models/spot");

const AllSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state?.spots));

    useEffect(() => {
        getAllSpots(dispatch);
    }, [dispatch, JSON.stringify(spots)]);

    // const getAllSpots = (e) => {
    //     e.preventDefault();
    //     dispatch(getAllSpots({...spots}))
    // }
    return (
        <div className="spotsPage">
      <div className="eachSpot">
        {spots &&
          spots.map((spot) => (
            <div className="spotCard" key={spot.id}>
              <NavLink to={`/spots/${spot.id}`}>
                <div className="room">
                  <div className="imgDiv">
                    <img className="spotImg" src={spot.previewImage}></img>
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
                            {/* {starSpot(spot.id)} */}
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
