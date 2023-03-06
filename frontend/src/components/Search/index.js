
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import { fetchSearchedSpots } from "../../store/search";
import Footer from "../Footer";


function SearchBar() {
    const search = useSelector((state) => Object.values(state?.search))
    const dispatch = useDispatch()
    const reviews = useSelector((state) => Object.values(state?.reviews));

    useEffect(() => {
        const url = new URL(window.location.href)
        const searchParameters = url.searchParams;
        (async () => {
            let searchInput = searchParameters.get("input");
            dispatch(fetchSearchedSpots(searchInput))
        })();

    }, [dispatch])


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
        <>
            {search.length ? <h2 className="nav-search">Search Results: </h2> : <div className="in-search">No Results</div>}
            <div className="spotsPage">
                <div className="eachSpot">
                    <div className="spotCard">
                        {search.map((spot) => {
                            return <div className="spotCard" key={spot.id}>
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
                                        <div className="spotName" style={{ color: "black", fontWeight: "bold" }}>
                                            {spot.name}
                                        </div>
                                        <div className="roomDetails">
                                            <div className="roomData">
                                                <div className="spotLocation" style={{ color: "gray" }}>
                                                    <div >
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
                        })}
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )

}

export default SearchBar;
