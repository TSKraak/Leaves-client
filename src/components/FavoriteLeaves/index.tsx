import React, { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import "./FavoriteLeaves.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteUserPlants } from "../../store/plants/actions";
import { selectFavoriteUsersPlants } from "../../store/plants/selectors";
import { removeFavoriteUser } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import { noLeafPicture } from "../../config/constants";

export default function FavoriteLeaves() {
  const dispatch = useDispatch();
  const plants = useSelector(selectFavoriteUsersPlants);
  const user = useSelector(selectUser);

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

  if (!user.token) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className="all-leaves-container">
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {plants.map((plant) => {
          return (
            <Card
              key={plant.id}
              className="mb-4"
              style={{
                width: "30%",
                margin: "0 2rem 0 0",
                justifyContent: "center",
                alignItems: "center",
                background: "rgb(255,255,255,0.8)",
                borderRadius: "2rem",
              }}
            >
              <img
                className="plant-image"
                src={!plant.imageUrl ? noLeafPicture : plant.imageUrl}
                alt="plant"
              />

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
                  {moment(plant.createdAt).format("ddd DD MMMM YYYY HH:mm")}{" "}
                  <br></br>
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
