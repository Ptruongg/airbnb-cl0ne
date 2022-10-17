import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const USER_SPOTS = 'spots/USER_SPOTS';
const CREATE = 'spots/CREATE';
const EDIT = 'spots/EDIT';
const DELETE = 'spots/DELETE';

const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE,
        spot,
    }
}

const getUserSpots = (spots) => {
    return {
        type: USER_SPOTS,
        spots
    }
}

const editSpot = (spot) => {
    return {
        type: EDIT,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE,
        spotId
    }
}

export const getSpots = async (dispatch) => {
    const response = csrfFetch("/api/spots");
    console.log(response)
    if (response.ok) {
        const spots = await response.json()
        dispatch(getAllSpots(spots));
        const all = {};
        spots.forEach((spot) => all([spot.id]));
        return { ...all }
    }
    return {};
}

const initialState = {};
const spotsReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const allSpots = {};
            action.spots.forEach((spot) => (allSpots[spot.id] = spot));
            return allSpots;
        }
        default:
            return state;
    }
};

export default spotsReducer;
