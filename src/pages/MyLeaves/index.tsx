import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";

export default function MyLeavesPage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  if (!user.email) {
    return <Redirect to="/"></Redirect>;
  }

  // useEffect(() => {
  // dispatch
  // }, [input])

  return (
    <div>
      <h1>My Leaves Page</h1>
    </div>
  );
}
