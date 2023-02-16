import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import { NavLink } from "react-router-dom";


const SearchBar = ({ spots, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault();

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(spots)
        const resultsArr = spots.filter(spot => spot.city.includes(e.target.value) || spot.name.includes(e.target.value))

        setSearchResults(resultsArr)
    }


    return (
        <header>
            <form className='searched' onSubmit={handleSubmit}>
                <input
                    className='searchInput'
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                />
                <button className='searchButton'>
                    Search
                </button>

            </form>
        </header>
    )
}

export default SearchBar
