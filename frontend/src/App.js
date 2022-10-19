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
            <AllSpots />
          </Route>
          <Route exact path="/create">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <SpotEdit />
          </Route>
          <Route path="*">
            <div className="pageNotFound">404 Page Not Found</div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
