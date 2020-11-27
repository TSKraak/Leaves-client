import React, { useEffect } from "react";
import "./AllLeaves.scss";
import moment from "moment";
import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPlants } from "../../store/plants/actions";
import { selectAllPlants } from "../../store/plants/selectors";
import { NavLink } from "react-router-dom";

export default function AllLeaves() {
  const dispatch = useDispatch();
  const plants = useSelector(selectAllPlants);

  useEffect(() => {
    if (plants) {
      return undefined;
    }
    dispatch(fetchAllPlants());
  }, [dispatch, plants]);

  return (
    <div className="all-leaves-container">
      <Container
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {plants.map((plant) => {
          return (
            <Card
              key={plant.id}
              className="mb-4"
              style={{
                width: "25vw",
                margin: "0 2rem 0 0",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img className="plant-image" src={plant.imageUrl} alt="plant" />

              <Card.Body>
                <NavLink
                  className="plant-detail-link"
                  to={`/leaves/${plant.id}`}
                >
                  <Card.Title>{plant.name}</Card.Title>
                </NavLink>
                <Card.Subtitle className="mb-2 text-muted">
                  {plant.scientificName}
                </Card.Subtitle>
                <Card.Text>{plant.description}</Card.Text>
              </Card.Body>
              <Card.Footer style={{ alignSelf: "stretch" }}>
                <small className="text-muted">
                  Posted on:{" "}
                  {moment(plant.updatedAt).format("DD-MM-YYYY HH:mm")} <br></br>
                  by {plant.user.firstName} {plant.user.lastName}
                </small>
              </Card.Footer>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}
