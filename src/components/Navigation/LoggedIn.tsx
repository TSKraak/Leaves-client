import React from "react";
import "./Navigation.scss";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";
import NavbarItem from "./NavbarItem";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
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
