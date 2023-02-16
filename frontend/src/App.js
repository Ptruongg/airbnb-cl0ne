import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProfileButton from "./components/Navigation/ProfileButton";
import DemoUser from "./components/DemoUser";
import AllSpots from "./components/Spots";
import SpotDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpot";
import SpotEdit from "./components/SpotEdit";
import CreateReviews from "./components/SpotDetails/createReviews";
import UserReviews from "./components/UserSpots/userReviews";
import UserSpots from "./components/UserSpots";
import BookingPage from "./components/Bookings/BookingPage";
import MyBookings from "./components/Bookings/myBookings";
import Search from "./components/Search/index"
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
            <DemoUser />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
            <ProfileButton />
          </Route>
          <Route exact path="/">
            {/* <Search /> */}
            <AllSpots />
            <Footer />
          </Route>
          <Route exact path="/currentUser/bookings">
            <MyBookings />
          </Route>
          <Route exact path="/bookings/:bookingId">
            <BookingPage />
          </Route>
          <Route exact path="/create">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/userSpots">
            <UserSpots />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <SpotEdit />
          </Route>
          <Route exact path="/spots/currentUser/reviews">
            <UserReviews />
          </Route>
          <Route exact path="/spots/:spotId/createReview">
            <CreateReviews />
          </Route>
          {/* <Route path="/search">

          </Route> */}
          <Route path="*">
            <div className="pageNotFound">404 Page Not Found</div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
