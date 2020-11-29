import React, { useEffect } from "react";
import "./MyLeaves.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";
import { Card, Container } from "react-bootstrap";
import { fetchAllPlants } from "../../store/plants/actions";
import { selectMyPlants } from "../../store/plants/selectors";

export default function MyLeavesPage() {
  const user = useSelector(selectUser);
  const plants = useSelector(selectMyPlants);
  const dispatch = useDispatch();

  useEffect(() => {
    if (plants.length) {
      return undefined;
    }
    dispatch(fetchAllPlants());
  }, [dispatch, plants.length]);

  if (!user.email) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className="all-leaves-container">
      <h1 className="my-leaves-page-title">My Leaves</h1>
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
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
                textAlign: "center",
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
                  {moment(plant.createdAt).format("DD-MM-YYYY HH:mm")} <br></br>
                </small>
              </Card.Footer>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}
