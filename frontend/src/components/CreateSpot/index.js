import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots"
import "./createSpot.css";

const CreateSpotForm = () => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(1);
    const [previewImage, setPreviewImage] = useState("");
    // const [avgRating, setAvgRating] = useState('');
    const [errors, setErrors] = useState([])
    const [submitSuccess, setSubmitSuccess] = useState(false);

    if (submitSuccess) {
        return <Redirect to="/" />
    };

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

        const imgRegex = new RegExp(
            /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
        );
        if (previewImage && !imgRegex.test(previewImage)) {
            setErrors([
                "Invalid Image Url! URL must start with https:// and contain a .png, .jpg, .jpeg, .gif, .png or .svg!",
            ]);
            return;
        };
        setErrors([]);
        let post = {
            name: name,
            address: address,
            city: city,
            state: state,
            country: country,
            description: description,
            price: price,
            previewImage: previewImage,
        };


        const validationErrors = errorAlerts();
        if (validationErrors.length > 0) {
            setErrors(validationErrors)
            return;
        }
        return dispatch(spotActions.createSpot(post))
            .then(async (res) => {
                setSubmitSuccess(true);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
    }
    return (
        <div className="formContainer">
            <div>
                <h2>Create Your Airbnb</h2>
            </div>
            <form className="spotForm" onSubmit={handleSubmit}>
                {errors ?? (
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                )}
                <div>

                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Address
                    </label>
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>

                    <label>
                        City
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>

                    <label>
                        State
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>

                    <label>
                        Country
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>

                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>

                    <label>
                        Price
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>

                    <label>
                        Images
                        <input
                            type="text"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="buttonContainer">
                    <button className="createSpot" type="submit" >
                        Create Spot
                    </button>
                </div>
            </form>
        </div>
    );
};


export default CreateSpotForm;
