import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./Search.css"

export default function Search() {
    const [APIData, setAPIData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        axios.get(`/api/spots`).then((response) => {
            setAPIData(response.data);
        });
    }, []);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== "") {
            const filteredData = APIData.spots.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(APIData);
        }
    };

    return (
        <div className="searchDiv">
            <div className="searchBar">
                <input
                    style={{ height: 20, borderColor: "gray", borderWidth: 1, height: "30px", width: "500px" }}
                    icon="search"
                    placeholder="Search by City..."
                    onChange={(e) => searchItems(e.target.value)}
                    className="inputBox"
                />
            </div>
            <div className="resultsSearch">
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <div className="results" key={item.id}>
                                <NavLink to={`/spots/${item.id}`}>
                                    <div className="resultsName">{item.name}</div>
                                    <div className="resultsCity" >{item.city}</div>
                                    <img className="search-img" src={item.previewImage}></img>
                                </NavLink>
                            </div>
                        );
                    })
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
