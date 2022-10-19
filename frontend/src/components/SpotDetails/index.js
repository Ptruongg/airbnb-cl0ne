import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { getAllUsers } from "../../store/user";
import "./spotDetails.css"

const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotState = useSelector((state) => state.spots)
    const userState = useSelector((state) => state)
    const spot = spotState[spotId]
    // console.log('this is the spot state', spotState);
    // console.log('SPOT', spot)
    // console.log('users', userState)
    useEffect(() => {
        getAllSpots(dispatch);
    }, [dispatch, JSON.stringify(spotState)])

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch, JSON.stringify(userState)])

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
                </div>
            </>
        )

    )
}

export default SpotDetails;
