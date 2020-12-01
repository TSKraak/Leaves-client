import React, { useState } from "react";
import "./NewLeafPage.scss";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../../components/ImageUploader";
import { submitNewPlant } from "../../store/plants/actions";
import { Redirect, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FindPlantSpecies from "../../components/FindPlantSpecies";
import { selectUser } from "../../store/user/selectors";

const curr = new Date();
curr.setDate(curr.getDate());
export const newDate = curr.toISOString().substr(0, 10);

export default function NewLeafPage() {
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [waterPeriodDays, setWaterPeriodDays] = useState(0);
  const [waterAlert, setWaterAlert] = useState(newDate);
  const [fertilisePeriodDays, setFertilisePeriodDays] = useState(0);
  const [fertiliseAlert, setFertiliseAlert] = useState(newDate);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user.token) {
    return <Redirect to="/"></Redirect>;
  }

  const uploadImageUrl = (url: string) => {
    setImageUrl(url);
  };

  function submitForm(event: React.MouseEvent) {
    event.preventDefault();

    dispatch(
      submitNewPlant(
        name,
        scientificName,
        description,
        imageUrl,
        waterPeriodDays,
        waterAlert,
        fertilisePeriodDays,
        fertiliseAlert
      )
    );

    history.push("/myleaves");
  }

  return (
    <div className="update-profile-form-container">
      <div>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-2">Add Leaf</h1>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Enter Leaf name"
            />
          </Form.Group>
          {!name ? (
            <p style={{ color: "red" }}>
              Name is required, please enter a name for your leaf.
            </p>
          ) : undefined}
          <Form.Group controlId="formBasicScientificName">
            <Form.Label>Scientific name</Form.Label>
            <Form.Control
              value={scientificName}
              onChange={(event) => setScientificName(event.target.value)}
              type="text"
              placeholder="Enter scientific name"
            />
            <Form.Text className="text-muted">
              If you don't know the species of the plant, you can upload a
              picture here.<br></br>
              You will get suggestions of which plant it probably is.<br></br>
              <Popup
                trigger={
                  <Button variant="outline-success">Find species</Button>
                }
                position="right center"
                modal
              >
                <FindPlantSpecies />
              </Popup>
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              type="text"
              placeholder="Enter Leaf description"
            />
          </Form.Group>

          <Form.Group controlId="formBasicWaterPeriod">
            <Form.Label>Water period in days</Form.Label>
            <Form.Control
              value={waterPeriodDays}
              onChange={(event) =>
                setWaterPeriodDays(parseInt(event.target.value))
              }
              type="text"
              placeholder="Enter water period in days"
            />
          </Form.Group>

          <Form.Group controlId="formBasicWaterAlert">
            <Form.Label>Water alert</Form.Label>
            <Form.Control
              value={waterAlert}
              onChange={(event) => setWaterAlert(event.target.value)}
              type="date"
              min={newDate}
              placeholder="Date for next water alert"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicFertilisePeriod">
            <Form.Label>Fertilise period in days</Form.Label>
            <Form.Control
              value={fertilisePeriodDays}
              onChange={(event) =>
                setFertilisePeriodDays(parseInt(event.target.value))
              }
              type="text"
              placeholder="Enter fertilise period in days"
            />
          </Form.Group>

          <Form.Group controlId="formBasicFertiliseAlert">
            <Form.Label>Fertilise alert</Form.Label>
            <Form.Control
              value={fertiliseAlert}
              onChange={(event) => setFertiliseAlert(event.target.value)}
              type="date"
              min={newDate}
              placeholder="Date for next fertilise alert"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicImageUrl">
            <Form.Label>Leaf picture url</Form.Label>
            <Form.Control
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              type="text"
              placeholder="Paste url"
            />
          </Form.Group>
          <ImageUploader
            uploadPreset="plants"
            uploadImageUrl={uploadImageUrl}
          />
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
            <Button
              disabled={name ? false : true}
              variant="primary"
              type="submit"
              onClick={submitForm}
            >
              Add Leaf
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
