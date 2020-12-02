import React, { useState } from "react";
import "./UpdateLeafForm.scss";
import { Button, Col } from "react-bootstrap";
import ImageUploader from "../ImageUploader";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectPlantDetails } from "../../store/plants/selectors";
import { updatePlant } from "../../store/plants/actions";

export default function UpdateLeafForm() {
  const plant = useSelector(selectPlantDetails);
  const id = plant.id;
  const [name, setName] = useState(plant.name);
  const [scientificName, setScientificName] = useState(plant.scientificName);
  const [description, setDescription] = useState(plant.description);
  const [imageUrl, setImageUrl] = useState(plant.imageUrl);
  const [waterPeriodDays, setWaterPeriodDays] = useState(plant.waterPeriodDays);
  const [waterAlert, setWaterAlert] = useState(plant.waterAlert);
  const [fertilisePeriodDays, setFertilisePeriodDays] = useState(
    plant.fertilisePeriodDays
  );
  const [fertiliseAlert, setFertiliseAlert] = useState(plant.fertiliseAlert);
  const [editForm, setEditForm] = useState(false);

  const dispatch = useDispatch();

  const uploadImageUrl = (url: string) => {
    setImageUrl(url);
  };

  function submitForm(event: React.MouseEvent) {
    event.preventDefault();

    dispatch(
      updatePlant(
        id,
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

    setEditForm(false);
  }

  return (
    <div className="update-profile-form-container">
      <Button
        variant="outline-danger"
        onClick={(e) => (editForm ? setEditForm(false) : setEditForm(true))}
      >
        Update Leaf
      </Button>
      <div>
        {editForm ? (
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-2">Update Leaf</h1>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Enter Leaf name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicScientificName">
              <Form.Label>Scientific name</Form.Label>
              <Form.Control
                value={scientificName}
                onChange={(event) => setScientificName(event.target.value)}
                type="text"
                placeholder="Enter scientific name"
              />
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
              <Form.Label>Water every</Form.Label>
              <Form.Control
                value={waterPeriodDays ? waterPeriodDays : undefined}
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
                type="text"
                placeholder="Date for next water alert"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicFertilisePeriod">
              <Form.Label>Fertilise every</Form.Label>
              <Form.Control
                value={fertilisePeriodDays ? fertilisePeriodDays : undefined}
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
                type="text"
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
              <Button variant="primary" type="submit" onClick={submitForm}>
                Submit changes
              </Button>
            </Form.Group>
          </Form>
        ) : null}
      </div>
    </div>
  );
}
