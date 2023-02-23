import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_USER_SPOTS = 'spots/USER_SPOTS';
const GET_SPOT_ID = 'spots/GET_SPOT_ID';
const ADD_SPOT = 'spots/ADD_SPOT';
const EDIT_SPOT = 'spots/EDIT';
const DELETE_SPOT = 'spots/DELETE';
const SEARCH_SPOTS = 'spots/SEARCH';
const CLEAR_SEARCH_SPOTS = "spots/clearSearchSpots";

//actions
const searchSpots = (spots) => {
    return {
        type: SEARCH_SPOTS,
        spots,
    }
}

export const clearSearchSpots = () => {
    return {
        type: CLEAR_SEARCH_SPOTS
    };
};

const getSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

const getUserSpots = (currentUserSpots) => {
    return {
        type: GET_USER_SPOTS,
        currentUserSpots
    }
}

const getSpotId = (spot) => {
    return {
        type: GET_SPOT_ID,
        spot
    }
}

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot,
    }
}


const editSpot = (editedSpot) => {
    return {
        type: EDIT_SPOT,
        editedSpot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}
//thunks --

//get all spots
export const fetchSearchedSpots = (search) => async (dispatch) => {
    const response = search
        ? await csrfFetch(`/api/spots?search=${search}`)
        : await csrfFetch("/api/spots")

    if (response.ok) {
        const data = await response.json();
        console.log(data, 'daaaaaaaaaaata')
        dispatch(searchSpots(data.spots));
        return response;
    }
    return response;
}
export const getAllSpots = async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    if (response.ok) {
        const spots = await response.json();
        dispatch(getSpots(spots));
        const all = {};
        spots.spots.forEach((spot) => (all[spot.id] = spot));
        return { ...all };
    }
    return {};
};
//get current user's spots
export const usersSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/current")
    if (response.ok) {
        const allSpots = await response.json();
        dispatch(getUserSpots(allSpots));
        return allSpots
    }
    return response
}
//get spot details
export const spotDetails = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`)
    if (response.ok) {
        const spotdeats = await response.json();
        dispatch(getSpotId(spotdeats));
        return spotdeats
    }
    return response
}
//create a spot
export const createSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        body: JSON.stringify(spot),
    });
    if (response.ok) {
        const newSpot = await response.json();
        dispatch(addSpot(newSpot))
        return newSpot
    }
    return response;
}
export const fetchSearchSpots = (searchInput) => async (dispatch) => {
    console.log(searchInput, "made itttttttttttttttttttttttttttt")
    const response = await csrfFetch("/api/spots/search", {
        method: "POST",
        body: JSON.stringify({
            searchInput
        }),
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data, "made itttttttttttttttttttttttttttt")

        dispatch(searchSpots(data));
        return response;
    }
    return response;
};


//edit a spot
// export const editSpotID = (spot) => async (dispatch) => {
//     const response = await csrfFetch(`api/spots/${spot.spotId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(spot)
//     });
//     if (response.ok) {
//         const editedSpot = await response.json();
//         dispatch(editSpot(editedSpot))
//         return editedSpot;
//     }
//     return response;
// }

//edit a spot
export const spotEdit = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.spotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot),
    });
    if (response.ok) {
        const editedSpot = await response.json();
        dispatch(editSpot(editedSpot));
        return editedSpot;
    }
    return response;
};

//delete a spot
export const deleteSpotId = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
        // body: JSON.stringify(spotId)
    });
    if (response.ok) {
        const deletedSpot = await response.json();
        dispatch(deleteSpot(deletedSpot))
        return dispatch
    }
    return response
}

// function normalizedObj(array) {
//     let newObj = {};
//     array.forEach((ele) => {
//         if (ele.avgRating) {
//             ele.avgRating = Math.round(ele.avgRating * 10) / 10
//         }
//         newObj[ele.id] = ele;
//     });
//     return newObj;
// }

const initialState = { searchSpots: {} };
const spotsReducer = (state = initialState, action) => {
    // const newState = { ...state }
    switch (action.type) {
        case SEARCH_SPOTS: {
            let newSpots = { ...state };
            action.spots.forEach((spot) => (newSpots[spot.id] = spot));
            return newSpots
        }
        case CLEAR_SEARCH_SPOTS: {
            return {
                ...state,
                searchSpots: {},
            };
        }
        case GET_ALL_SPOTS: {
            let allSpots = {};
            action.spots.spots.forEach((spot) => (allSpots[spot.id] = spot));
            return allSpots;
        }
        case GET_USER_SPOTS: {
            let newState = {};
            action.currentUserSpots.forEach(spot => newState[spot.id] = spot);
            let allSpots = { ...newState };
            return allSpots;
        }
        case GET_SPOT_ID: {
            let newState = { ...state };
            newState[action.spot.id] = action.spot
            return newState
        }
        case ADD_SPOT: {
            let newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case EDIT_SPOT: {
            const newState = { ...state };
            newState[action.editedSpot.id] = action.editedSpot;
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
