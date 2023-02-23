import { csrfFetch } from "./csrf"

const SEARCH_SPOTS = 'spots/SEARCH';


const searchSpots = (spots) => {
    return {
        type: SEARCH_SPOTS,
        spots,
    }
}

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

const initialState = { searchSpots: {} };
const searchReducer = (state = initialState, action) => {
    // const newState = { ...state }
    switch (action.type) {
        case SEARCH_SPOTS: {
            let newSpots = { ...state };
            action.spots.forEach((spot) => (newSpots[spot.id] = spot));
            return newSpots
        }
        default:
            return state;
    }
};

export default searchReducer;
