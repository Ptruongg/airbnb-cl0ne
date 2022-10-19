import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./createSpot.css";

const CreateSpot = () => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [avgRating, setAvgRating] = useState('');
    const [errors, setErrors] = useState([])

    const errorAlerts = () => {
        const errorNotifications = [];

        if (!address) errorNotifications.push("Address is required")
        if (!city) errorNotifications.push("City is required")
        if (!state) errorNotifications.push("State is required")
        if (!country) errorNotifications.push("Country is required")
        if (!name) errorNotifications.push("Name is required")
        if (!description) errorNotifications.push("Description is required")
        if (!price) errorNotifications.push("Price is required");

        return errorNotifications
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        let post = {
            address: address,
            city: city,
            state: state,
            name: name,
            description: description,
            price: price,
            previewImage: previewImage,
        }


    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h2>Create Your Airbnb</h2>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </label>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Price
                    <Number
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </label>
                <label>
                    Images
                    <img
                        value={previewImage}
                        onChange={e => setPreviewImage(e.target.value)}
                    />
                </label>
                <input type="submit" value='Create Your Airbnb' />
            </form>
        </div>
    )
}

export default CreateSpot
