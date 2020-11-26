import moment from "moment";
import React from "react";
import "./ProfilePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UpdateProfileForm from "../../components/UpdateProfileForm";
import { selectUser } from "../../store/user/selectors";
import { Button } from "react-bootstrap";

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  if (!user.email) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div>
      <h1 className="profile-page-title">{user.firstName}'s Profile</h1>
      <div className="profile-page-container">
        <div className="profile-information">
          <table style={{ width: "25rem" }} className="doctor-table">
            <thead>
              <tr>
                <th>Your information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>User id</td>
                <td>{user.id}</td>
              </tr>
              <tr>
                <td>First name</td>
                <td>{user.firstName}</td>
              </tr>
              <tr>
                <td>Last name</td>
                <td>{user.lastName}</td>
              </tr>
              <tr>
                <td>Email address</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{user.city}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{user.country}</td>
              </tr>
              <tr>
                <td>Account created</td>
                <td>{moment(user.createdAt).format("DD-MM-YYYY HH:mm")}</td>
              </tr>
              <tr>
                <td>Last updated</td>
                <td>{moment(user.updatedAt).format("DD-MM-YYYY HH:mm")}</td>
              </tr>
            </tbody>
          </table>
          <UpdateProfileForm />
        </div>
        <div className="profile-picture-container">
          <img
            className="profile-picture"
            src={user.imageUrl}
            alt="profile pic"
          />
          <div>
            <Button className="edit-picture-button" variant="outline-danger">
              Edit picture
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
