import React, { useEffect } from "react";
import "./App.scss";
import leaveslogo from "./images/leaveslogo.png";
import { Switch, Route, NavLink } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import HomePage from "./pages/HomePage";
import LeavesPage from "./pages/LeavesPage";
import LeavesDetailPage from "./pages/LeavesDetailPage";

const NotFound = () => {
  return <h3>Oops, sorry. Page doesn't exist.</h3>;
};

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  // const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="title-container">
        <img
          src={leaveslogo}
          alt="logo"
          width="40"
          height="40"
          style={{ margin: "0rem 0.5rem 0rem 0rem" }}
        />
        <span className="title-text">Leaves</span>
      </div>
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/leaves">
          <LeavesPage />
        </Route>

        <Route exact path="/leaves/:id?">
          <LeavesDetailPage />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  );
}
export default App;
