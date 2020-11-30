import React, { useEffect } from "react";
import "./AllLeaves.scss";
import moment from "moment";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPlants,
  fetchFavoriteUserPlants,
} from "../../store/plants/actions";
import { selectAllPlants } from "../../store/plants/selectors";
import { NavLink } from "react-router-dom";
import { addFavoriteUser, removeFavoriteUser } from "../../store/user/actions";
import { selectFollowingUsers } from "../../store/user/selectors";

export default function AllLeaves() {
  const dispatch = useDispatch();
  const plants = useSelector(selectAllPlants);
  const followingUsers = useSelector(selectFollowingUsers);

  const clickToFollow = async (id: number) => {
    await dispatch(addFavoriteUser(id));
    dispatch(fetchFavoriteUserPlants());
  };

  const clickToUnFollow = (id: number) => {
    dispatch(removeFavoriteUser(id));
  };

  useEffect(() => {
    if (plants.length) {
      return undefined;
    }
    dispatch(fetchAllPlants());
  }, [dispatch, plants.length]);

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
              {followingUsers.includes(plant.user.id) ? (
                <Button
                  className="mb-4"
                  variant="outline-danger"
                  onClick={() => clickToUnFollow(plant.user.id)}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  className="mb-4"
                  variant="outline-success"
                  onClick={() => clickToFollow(plant.user.id)}
                >
                  Follow
                </Button>
              )}
              <Card.Footer style={{ alignSelf: "stretch" }}>
                <small className="text-muted">
                  Posted on:{" "}
                  {moment(plant.createdAt).format("DD-MM-YYYY HH:mm")} <br></br>
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
