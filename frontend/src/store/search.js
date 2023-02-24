import { csrfFetch } from "./csrf"

const SEARCH_SPOTS = 'spots/SEARCH';
const CLEAR_SEARCH_SPOTS = "spots/clearSearchSpots";

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


const initialState = {};
const searchReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
};

export default searchReducer;
