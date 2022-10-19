import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "./spotEdit.css";

const SpotEdit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { spotId } = useParams();
    spotId = Number(spotId)

    const spot = useSelector((state) => state.spots[spotId])

    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);
    const [errors, setErrors] = useState([])

    const updatedAddress = (e) => setAddress(e.target.value);
    const updatedCity = (e) => setCity(e.target.value);
    const updatedState = (e) => setState(e.target.value);
    const updatedCountry = (e) => setCountry(e.target.value);
    const updatedName = (e) => setName(e.target.value);
    const updatedDescription = (e) => setDescription(e.target.value);
    const updatedPrice = (e) => setPrice(e.target.value);
    const updatedPreviewImage = (e) => setPreviewImage(e.target.value);


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
        };


        const validationErrors = errorAlerts();
        if (validationErrors.length > 0) {
            setErrors(validationErrors)
            return;
        }
        return dispatch(spotActions.spotEdit(post))
            .then(async (res) => {
                // setSubmitSuccess(true);
                history.push(`/spots/${spotId}`)
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
                        Address
                    </label>
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={updatedAddress}
                        required
                    />
                </div>
                <div>

                    <label>
                        City
                        <input
                            type="text"
                            value={city}
                            onChange={updatedCity}
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
                            onChange={updatedState}
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
                            onChange={updatedCountry}
                            required
                        />
                    </label>
                </div>
                <div>

                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={updatedName}
                            required
                        />
                    </label>
                </div>
                <div>

                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={updatedDescription}
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
                            onChange={updatedPrice}
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
                            onChange={updatedPreviewImage}
                        />
                    </label>
                </div>
                <div className="buttonContainer">
                    <button className="confirmEditButton" type="submit" >
                        Confirm Edit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SpotEdit
