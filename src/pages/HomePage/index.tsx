import React, { useEffect } from "react";
import "./HomePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { fetchPlantSuggestions } from "../../store/plants/actions";
import { selectSuggestions } from "../../store/plants/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const plants = useSelector(selectSuggestions);

  useEffect(() => {
    if (plants.length) {
      return undefined;
    }

    dispatch(fetchPlantSuggestions());
  }, [dispatch, plants.length]);

  return (
    <div className="homepage-container">
      <h1 className="welcome-text-homepage">Welcome to Leaves</h1>
      <h3>Popular houseplants</h3>
      <Container className="plant-suggestions-container">
        {plants.map((plant) => {
          return (
            <Row key={plant.id} className="plant-suggestion-card">
              <Col xs={2.5} md={2.5}>
                <img
                  className="plant-sugg-picture"
                  src={plant.imageUrl}
                  alt="profile pic"
                />
              </Col>
              <Col>
                <NavLink className="plant-sugg-link" to={`/plants/${plant.id}`}>
                  <h4>
                    {plant.name} ({plant.scientificName})
                  </h4>
                </NavLink>

                <p>
                  <strong>Description: </strong>
                  {plant.shortDescription}
                </p>
                <p>
                  <strong>Light:</strong>
                  {plant.shortLight}
                </p>
                <p>
                  <strong>Water:</strong>
                  {plant.shortWater}
                </p>
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
}
