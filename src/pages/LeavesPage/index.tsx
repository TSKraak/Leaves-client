import React, { useState } from "react";
import "./LeavesPage.scss";
import { NavLink } from "react-router-dom";
import AllLeaves from "../../components/AllLeaves";
import FavoriteLeaves from "../../components/FavoriteLeaves";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";

export default function LeavesPage() {
  const [favorites, setFavorites] = useState(false);
  const user = useSelector(selectUser);

  const displayLeavesComponent = () => {
    if (favorites) {
      return <FavoriteLeaves />;
    }
    return <AllLeaves />;
  };

  return (
    <div className="leaves-page-container">
      <h1>View Leaves</h1>
      <div className="leaves-links-container">
        <div className="leave-link-container">
          <NavLink
            className="leave-link"
            activeStyle={{
              textDecoration: "underline",
              color: "black",
            }}
            exact
            to="/leaves/"
            onClick={() => setFavorites(false)}
          >
            <h3>All Leaves</h3>
          </NavLink>
        </div>
        {user.email ? (
          <div className="leave-link-container">
            <NavLink
              className="leave-link"
              activeStyle={{
                textDecoration: "underline",
                color: "black",
              }}
              exact
              to="/leaves/favorites"
              onClick={() => setFavorites(true)}
            >
              <h3>Favorites</h3>
            </NavLink>
          </div>
        ) : undefined}
      </div>
      {window.location.href.indexOf("favorites") > -1 ? (
        <FavoriteLeaves />
      ) : (
        displayLeavesComponent()
      )}
    </div>
  );
}
