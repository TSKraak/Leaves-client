import React from "react";
import "./Navigation.scss";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import NavbarItem from "./NavbarItem";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickLogOut = () => {
    dispatch(logOut());
    return history.push("/");
  };

  return (
    <>
      <NavbarItem path="/profile" linkText="Profile" />
      <Button variant="secondary" onClick={() => onClickLogOut()}>
        Logout
      </Button>
    </>
  );
}
