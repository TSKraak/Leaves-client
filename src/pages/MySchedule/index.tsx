import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";
import "./MySchedule.scss";

import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  TodayButton,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  selectMyPlants,
  selectReminderData,
} from "../../store/plants/selectors";
import { fetchAllPlants } from "../../store/plants/actions";

export default function MySchedule() {
  const user = useSelector(selectUser);
  const plants = useSelector(selectMyPlants);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const schedulerData = useSelector(selectReminderData);

  useEffect(() => {
    if (plants.length) {
      return undefined;
    }
    dispatch(fetchAllPlants());
  }, [dispatch, plants.length]);

  if (!user.token) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div>
      <h1 className="my-schedule-page-title">Schedule</h1>
      <Paper>
        <Scheduler data={schedulerData} height="auto" firstDayOfWeek={1}>
          <ViewState defaultCurrentDate={currentDate} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
}
