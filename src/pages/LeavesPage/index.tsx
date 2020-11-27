import React, { useState } from "react";
import "./LeavesPage.scss";
import { NavLink, useParams } from "react-router-dom";
import AllLeaves from "../../components/AllLeaves";
import FavoriteLeaves from "../../components/FavoriteLeaves";

interface Parameters {
  favorites: "favorites" | undefined;
}

export default function LeavesPage() {
  const params: Parameters = useParams();
  const [favorites, setFavorites] = useState(false);

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
      </div>
      {displayLeavesComponent()}
    </div>
  );
}
