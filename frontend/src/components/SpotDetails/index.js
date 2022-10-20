import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getAllSpots, deleteSpotId } from "../../store/spots";
import { getAllUsers } from "../../store/user";

import "./spotDetails.css"

const SpotDetails = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spotState = useSelector((state) => state.spots)
    const userState = useSelector((state) => state)
    const sessionUser = useSelector((state) => state.session.user)
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

    const editSpot = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/edit`)
    }

    const spotDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpotId(spotId));
        history.push('/')
    }
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
                    {sessionUser && sessionUser.id === spot.ownerId &&
                        (<div className="editDeleteButtons">
                            <button onClick={editSpot}>
                                Edit
                            </button>
                            <button onClick={spotDelete}>
                                Delete
                            </button>
                        </div>)}

                </div>
            </>
        )

    )
}

export default SpotDetails;
