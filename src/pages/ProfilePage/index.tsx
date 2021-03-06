import React from "react";
import moment from "moment";
import "./ProfilePage.scss";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import UpdateProfileForm from "../../components/UpdateProfileForm";
import { selectUser } from "../../store/user/selectors";

export default function ProfilePage() {
  const user = useSelector(selectUser);

  if (!user.token) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className="Profile-Page">
      <h2 className="profile-page-title">Your Profile</h2>
      <div className="profile-page-container">
        <div className="profile-information">
          <table style={{ width: "30rem" }} className="profile-table">
            <thead>
              <tr>
                <th>Your account details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="profile-detail-column-1">User id</td>
                <td>{user.id}</td>
              </tr>
              <tr>
                <td className="profile-detail-column-1">First name</td>
                <td>{user.firstName}</td>
              </tr>
              <tr>
                <td className="profile-detail-column-1">Last name</td>
                <td>{user.lastName}</td>
              </tr>
              <tr>
                <td className="profile-detail-column-1">Email address</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td className="profile-detail-column-1">City</td>
                <td>{user.city}</td>
              </tr>
              <tr>
                <td className="profile-detail-column-1">Country</td>
                <td>{user.country}</td>
              </tr>
              <tr>
                <td className="profile-detail-column-1">Account created</td>
                <td>
                  {moment(user.createdAt).format("HH:mm - dddd DD MMMM YYYY")}
                </td>
              </tr>
              <tr>
                <td className="profile-detail-column-1">Last updated</td>
                <td>
                  {moment(user.updatedAt).format("HH:mm - dddd DD MMMM YYYY")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="profile-picture-container">
          <img
            className="profile-picture"
            src={user.imageUrl}
            alt="profile pic"
          />
        </div>
      </div>
      <UpdateProfileForm />
    </div>
  );
}
