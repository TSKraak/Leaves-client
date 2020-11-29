import React, { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./FavoriteLeaves.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteUserPlants } from "../../store/plants/actions";
import { selectFavoriteUsersPlants } from "../../store/plants/selectors";
import { removeFavoriteUser } from "../../store/user/actions";

export default function FavoriteLeaves() {
  const dispatch = useDispatch();
  const plants = useSelector(selectFavoriteUsersPlants);

  const clickToUnFollow = async (id: number) => {
    await dispatch(removeFavoriteUser(id));
    dispatch(fetchFavoriteUserPlants());
  };

  useEffect(() => {
    if (plants.length) {
      return undefined;
    }
    dispatch(fetchFavoriteUserPlants());
  }, [dispatch, plants.length]);

  return (
    <div className="all-leaves-container">
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
              <Button
                className="mb-4"
                variant="outline-danger "
                onClick={() => clickToUnFollow(plant.user.id)}
              >
                Unfollow
              </Button>
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
