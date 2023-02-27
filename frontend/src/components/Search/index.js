// import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Card, Input } from "semantic-ui-react";
// import { NavLink } from "react-router-dom";
// import ListPage from "../../ListPage";
// import "./Search.css"

// export default function Search() {
//     const [APIData, setAPIData] = useState([]);
//     const [filteredResults, setFilteredResults] = useState([]);
//     const [searchInput, setSearchInput] = useState("");

//     const handleSubmit = (e) => e.preventDefault();

//     useEffect(() => {
//         axios.get(`/api/spots`).then((response) => {
//             setAPIData(response.data);
//         });
//     }, []);


//     const searchItems = (searchValue) => {
//         setSearchInput(searchValue);
//         if (searchInput !== "") {
//             const filteredData = APIData.spots.filter((item) => {
//                 return Object.values(item.city)
//                     .join("")
//                     .toLowerCase()
//                     .includes(searchInput.toLowerCase());
//             });
//             setFilteredResults(filteredData);
//         } else {
//             setFilteredResults(APIData);
//         }
//     };


//     return (
//         <div className="searchDiv">
//             <form className="searchBar" onSubmit={handleSubmit}>
//                 <input
//                     style={{ height: 20, borderColor: "gray", borderWidth: 1, height: "30px", width: "500px" }}
//                     icon="search"
//                     placeholder="Search by City..."
//                     onChange={(e) => searchItems(e.target.value)}
//                     className="inputBox"
//                 />
//             </form>

//             <div className="resultsSearch">
//                 {searchInput.length > 1 ? (
//                     filteredResults.map((item) => {
//                         return (
//                             <div className="results" key={item.id}>
//                                 <NavLink to={`/spots/${item.id}`}>
//                                     {/* <div className="resultsName">{item.name}</div> */}
//                                     <div className="resultsCity">{item.city}</div>
//                                     {/* <img className="search-img" src={item.previewImage}></img> */}
//                                 </NavLink>
//                             </div>
//                         );
//                     })
//                 ) : (
//                     <div></div>
//                 )}
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
// import "../Navigation.css";
// import "./SearchBar.css";
// import magnify from "./NavImages/magnifying-glass.svg";
// import { fetchSearchedSpots } from "../../store/spots";

import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink, useHistory } from "react-router-dom";
import { fetchSearchedSpots } from "../../store/search";
import { loadSpotReviewsThunk } from "../../store/reviews";
import SpotsDetail from "../SpotDetails";
import { getAllSpots } from "../../store/spots";
import Footer from "../Footer";
// import SpotsCards from "../SpotsCards";
// import "./Searched.css";

function SearchBar() {
    const [spotsShowing, setSpotsShowing] = useState([]);
    const [spotLoaded, setSpotLoaded] = useState(false);
    // const [loadedSpots, setLoadedSpots] = useState("")
    const spots = useSelector((state) => state?.spots)
    const search = useSelector((state) => Object.values(state?.search))
    const normalizedSpots = Object.values(spots);
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector((state) => Object.values(state?.reviews));
    // const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

    //const location = useLocation();


    useEffect(() => {
        const url = new URL(window.location.href)
        const searchParameters = url.searchParams;
        (async () => {
            let searchInput = searchParameters.get("input");
            console.log("ahhhhh seeeeee", fetchSearchedSpots)
            dispatch(fetchSearchedSpots(searchInput));
            setSpotsShowing(!spotsShowing);
        })();

    }, [dispatch])



    // useEffect(() => {
    //     dispatch(fetchSearchedSpots(searchInput))
    // }, [spotLoaded, dispatch])
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(fetchSearchedSpots(loadedSpots))
    // }
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
