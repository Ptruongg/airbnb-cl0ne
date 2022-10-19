import { csrfFetch } from "./csrf"

const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_USER_SPOTS = 'spots/USER_SPOTS';
const GET_SPOT_ID = 'spots/GET_SPOT_ID';
const ADD_SPOT = 'spots/ADD_SPOT';
const EDIT_SPOT = 'spots/EDIT';
const DELETE_SPOT = 'spots/DELETE';

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
    console.log('this is the response', response)
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
    const response = await csrfFetch(`api/spots/${spotId}`, {
        method: "DELETE",
        body: JSON.stringify(spotId)
    });
    if (response.ok) {
        const deletedSpot = await response.json();
        dispatch(deleteSpot(deletedSpot))
        return dispatch
    }
    return response
}

const initialState = {};
const spotsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const allSpots = {};
            action.spots.spots.forEach((spot) => (allSpots[spot.id] = spot));
            return allSpots;
        }
        case GET_USER_SPOTS: {
            const newState = {};
            action.currentUserSpots.forEach(spot => newState[spot.id] = spot);
            let allSpots = { ...newState };
            return allSpots;
        }
        case GET_SPOT_ID: {
            const newState = {...state};
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
