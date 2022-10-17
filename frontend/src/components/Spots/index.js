import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getSpots } from "../../store/spots";
// import { loadAllReviewsThunk } from "../../store/reviews";
import "./spots.css";

// import spot = require("../../../../backend/db/models/spot");


const AllSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state?.spots))
    console.log(spots, "spots")
    useEffect(() => {
        getSpots(dispatch)
    }, [dispatch])
    // const getAllSpots = (e) => {
    //     e.preventDefault();
    //     dispatch(getAllSpots({...spots}))
    // }
    return (
        <>
        <div> hi </div>
        <div>
            {spots?.map((spot) => {
                <div>
                    {spot.city}
                </div>
            })}
        </div>
        </>

        // <section>
        //     ID: {spotId.id}
        //     <Link to='/spots'>All Spots</Link>
        // </section>

    )
}

export default AllSpots
