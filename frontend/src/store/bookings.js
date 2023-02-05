import { csrfFetch } from "./csrf";

const GET_ALL_BOOKINGS = "bookings/get";
const GET_USER_BOOKINGS = "bookings/user";
const CREATE_BOOKING = "bookings/create";
const EDIT_BOOKING = "bookings/edit";
const DELETE_BOOKING = "bookings/delete";

//actions
const getAllBookingsAction = (bookings) => {
    return {
        type: GET_ALL_BOOKINGS,
        bookings
    }
}

const getUserBookingsAction = (user) => {
    return {
        type: GET_USER_BOOKINGS,
        payload: user
    }
}

const createBookingAction = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

const editBookingAction = (booking) => {
    return {
        type: EDIT_BOOKING,
        booking
    }
}

const deleteBookingAction = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}

//thunks

export const getAllBookings = () => async (dispatch) => {
    const response = await csrfFetch("/api/bookings")
    if (response.ok) {
        const allBookings = await response.json();
        dispatch(getAllBookingsAction(allBookings));
        return allBookings;
    }
    return response;
}

export const getUserBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current-user-bookings`);
    if(response.ok) {
        const booking = await response.json();
        dispatch(getUserBookingsAction(booking))
    }
}

export const createBooking = (id, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: "POST",
        body: JSON.stringify(booking)
    });
    if (response.ok) {
        const newBooking = await response.json();
        dispatch(createBookingAction(newBooking));
        return newBooking;
    }
    return response;
}

export const editBooking = (booking) => async (dispatch) => {
    const response = csrfFetch(`/api/bookings/${booking.id}`, {
        method: "PUT",
        headers: {"Content-Type": "applicaion/json"},
        body: JSON.stringify(booking)
    });
    if(response.ok) {
        const editedBooking = await response.json();
        dispatch(editBookingAction(editedBooking))
        return editedBooking;
    }
    return response;
}

export const deleteBooking = (bookingId) => async (dispatch) => {
    const response = csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
    });
    const res = await response.json();
    dispatch(deleteBookingAction(bookingId));
    return res;
}

const initialState = {};
const bookingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_BOOKINGS: {
            const newState = {};
            action.bookings.forEach((booking) => (newState[booking.id] = booking));
            let bookings = {...newState}
            return bookings
        }
        case GET_USER_BOOKINGS: {
            const newState = {};
            newState = action.payload;
            return newState;
        }
        case CREATE_BOOKING: {
            let newState = { ...state };
            newState[action.booking.id] = action.booking;
            return newState;
        }
        case EDIT_BOOKING: {
            const newState = { ...state };
            newState[action.booking.id] = action.booking;
            return newState
        }
        case DELETE_BOOKING: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
}

export default bookingsReducer;
