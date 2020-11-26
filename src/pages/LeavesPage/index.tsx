import React from "react";
import { useParams } from "react-router-dom";
import AllLeaves from "../../components/AllLeaves";
import FavoriteLeaves from "../../components/FavoriteLeaves";

interface Parameters {
  favorites: "favorites" | undefined;
}

export default function LeavesPage() {
  const params: Parameters = useParams();

  const displayLeavesComponent = () => {
    if (params.favorites === "favorites") {
      return <FavoriteLeaves />;
    }
    return <AllLeaves />;
  };

  return (
    <div>
      <h1>Leaves page</h1>
      {displayLeavesComponent()}
    </div>
  );
}
