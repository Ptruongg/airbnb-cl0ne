import React, { useEffect, useState } from "react";
import { useHistory, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserSpots, usersSpots } from "../../store/spots";
import "./userSpots.css";

const UserSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const allUserSpots = useSelector((state) => Object.values(state.spots))

    const handleClick = (spot) => {
        history.push(`/spots/${spot.id}`)
    }

    useEffect(() => {
        dispatch(usersSpots()).then(() => setLoaded(true));
    }, [dispatch]);

    return (
        <div>
            <h2 className="edits"> </h2>
        </div>
    )
}
