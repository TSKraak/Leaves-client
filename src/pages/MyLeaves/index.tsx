import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";

export default function MyLeavesPage() {
  const user = useSelector(selectUser);

  if (!user.email) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div>
      <h1>My Leaves Page</h1>
    </div>
  );
}
