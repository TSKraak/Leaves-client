import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchPlantSpecies } from "../../store/plants/actions";
import { selectSearchResults } from "../../store/plants/selectors";
import ImageUploader from "../ImageUploader";

interface SearchResult {
  score: number;
  species: {
    scientificNameWithoutAuthor: string;
    family: { scientificNameWithoutAuthor: string };
    commonNames: [];
  };
}

export default function FindPlantSpecies() {
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);

  const uploadImageUrl = (url: string) => {
    setImageUrl(url);
  };

  function submitForm(event: React.MouseEvent) {
    event.preventDefault();

    dispatch(searchPlantSpecies(imageUrl));
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Picture url</Form.Label>
          <Form.Control
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
            placeholder="Paste url or upload picture below"
          />
        </Form.Group>
        <ImageUploader uploadPreset="plants" uploadImageUrl={uploadImageUrl} />
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
            disabled={imageUrl ? false : true}
            variant="primary"
            type="submit"
            onClick={submitForm}
          >
            Search
          </Button>
        </Form.Group>
      </Form>
      {!searchResults
        ? undefined
        : searchResults.map((result: SearchResult) => {
            return (
              <Container>
                <Row>
                  <Col
                    sm={2}
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      border: "solid 1px lightgray",
                    }}
                  >
                    Score
                  </Col>
                  <Col
                    sm={3}
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      border: "solid 1px lightgray",
                    }}
                  >
                    Species
                  </Col>
                  <Col
                    sm={3}
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      border: "solid 1px lightgray",
                    }}
                  >
                    Family
                  </Col>
                  <Col
                    sm={3}
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      border: "solid 1px lightgray",
                    }}
                  >
                    Common names
                  </Col>
                </Row>
                <Row>
                  <Col
                    sm={2}
                    style={{
                      fontSize: "0.8rem",
                      border: "solid 1px lightgray",
                    }}
                  >
                    {(result.score * 100).toFixed(2)}%
                  </Col>
                  <Col
                    sm={3}
                    style={{
                      fontSize: "0.8rem",
                      border: "solid 1px lightgray",
                    }}
                  >
                    {result.species.scientificNameWithoutAuthor}
                  </Col>
                  <Col
                    sm={3}
                    style={{
                      fontSize: "0.8rem",
                      border: "solid 1px lightgray",
                    }}
                  >
                    {result.species.family.scientificNameWithoutAuthor}
                  </Col>
                  <Col
                    sm={3}
                    style={{
                      fontSize: "0.8rem",
                      border: "solid 1px lightgray",
                    }}
                  >
                    {result.species.commonNames.map((name: string) => (
                      <span>
                        - {name}
                        <br></br>
                      </span>
                    ))}
                  </Col>
                </Row>
              </Container>
            );
          })}
    </div>
  );
}
