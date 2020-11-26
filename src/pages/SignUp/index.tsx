import React, { useState, useEffect } from "react";
import "./SignUp.scss";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ImageUploader from "../../components/ImageUploader";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      // history.push("/");
    }
  }, [token, history]);

  const uploadImageUrl = (url: string) => {
    setImageUrl(url);
  };

  function submitForm(event: React.MouseEvent) {
    event.preventDefault();

    dispatch(
      signUp(firstName, lastName, city, country, imageUrl, email, password)
    );

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setCity("");
    setCountry("");
    setImageUrl("");
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup</h1>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            type="text"
            placeholder="Enter first name"
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            type="text"
            placeholder="Enter last name"
          />
        </Form.Group>

        <Form.Group controlId="formBasicCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(event) => setCity(event.target.value)}
            type="text"
            placeholder="Enter city"
          />
        </Form.Group>

        <Form.Group controlId="formBasicCountry">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            type="text"
            placeholder="Enter country"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckPassword">
          <Form.Label>Password check</Form.Label>
          <Form.Control
            value={checkPassword}
            onChange={(event) => setCheckPassword(event.target.value)}
            type="password"
            placeholder="Retype password"
            required
          />
        </Form.Group>
        {!password ? (
          <p>Please enter a new password.</p>
        ) : password === checkPassword ? null : (
          <p style={{ color: "red" }}>
            The passwords don't match. Please check again.
          </p>
        )}
        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Profile picture url</Form.Label>
          <Form.Control
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
            placeholder="Paste url"
          />
        </Form.Group>
        <ImageUploader uploadPreset="profile" uploadImageUrl={uploadImageUrl} />
        {imageUrl ? (
          <div style={{ margin: "1rem 0 0 0" }}>
            <p style={{ fontSize: "0.8rem" }}>Image preview:</p>
            <img
              className="new-image-preview"
              src={imageUrl}
              alt="profile pic"
            />
          </div>
        ) : null}
        <Form.Group className="mt-5">
          {!email || !password ? (
            <p style={{ color: "red" }}>Enter email and password</p>
          ) : password === checkPassword ? (
            <Button variant="primary" type="submit" onClick={submitForm}>
              Sign up
            </Button>
          ) : null}
        </Form.Group>
        <Link to="/login">Click here to log in</Link>
      </Form>
    </Container>
  );
}
