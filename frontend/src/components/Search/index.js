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

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
// import "../Navigation.css";
// import "./SearchBar.css";
// import magnify from "./NavImages/magnifying-glass.svg";
import { searchedSpots } from "../../store/spots";

function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const [anywhere, setAnyWhere] = useState("");
  const [anyweek, setAnyWeek] = useState("");
  const [guests, setGuests] = useState("");

  const spotId = (pathname) => pathname.split("/")[2];

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchedSpots(anywhere))

  }

  return (
    <div
      className={
        pathname === `/spots/${spotId(pathname)}`
          ? "search-bar-spot-details"
          : "search-bar-wrapper"
      }
    >
      <form onSubmit={handleSubmit}>
      <div className="search">
        <input
          type="text"
          name="anywhere"
          placeholder="Anywhere"
          value={anywhere}
          onChange={(e) => setAnyWhere(e.target.value)}
          required
        />

        <button
          className="search-button"
          type="submit"
        >
          {/* <img src={magnify} alt="search" /> */}
        </button>
      </div>
      </form>
    </div>
  );
}

export default SearchBar;
