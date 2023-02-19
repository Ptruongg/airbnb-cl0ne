// import React, { useState, useEffect } from "react";
// import axios from "axios";
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, NavLink, useHistory } from "react-router-dom";
import { fetchSearchedSpots} from "../../store/spots";
import SpotsDetail from "../SpotDetails";
// import SpotsCards from "../SpotsCards";
// import "./Searched.css";

function SearchBar() {
  const [spotsShowing, setSpotsShowing] = useState(false);
  const spots = useSelector((state) => state?.spots);
  const normalizedSpots = Object.values(spots);
  const dispatch = useDispatch();
  const history = useHistory();
  //console.log("this should be an array", normalizedSpots)
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParameters = url.searchParams;
    (async () => {
      let searchInput = searchParameters.get("input");
      //console.log("searcghinput", searchInput)
      await dispatch(fetchSearchedSpots(searchInput));
      //console.log("normalized updating", normalizedSpots)
      setSpotsShowing(!spotsShowing);
    })();
  }, []);

  return (
    <>
      {normalizedSpots.length ? (
        <div className="nav-search">Search Results: </div>
      ) : (
        <div className="in-search">No Results</div>
      )}
      <div className="property-of">
        {normalizedSpots.map((spot) => {
          return (
            <div className="spotsss">
              <NavLink to={`/spots/${spot.id}`}>
                <SpotsDetail spot={spot} />
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SearchBar;
