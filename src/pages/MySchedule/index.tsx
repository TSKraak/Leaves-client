import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";
import "./MySchedule.scss";

export default function MySchedule() {
  const user = useSelector(selectUser);

  if (!user.token) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div>
      <h1 className="my-schedule-page-title">Schedule</h1>
    </div>
  );
}
