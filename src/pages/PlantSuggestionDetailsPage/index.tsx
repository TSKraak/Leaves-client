import React, { useEffect } from "react";
import "./PlantSuggestionDetailsPage.scss";
import { Redirect, useParams } from "react-router-dom";
import { selectSuggestions } from "../../store/plants/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlantSuggestions } from "../../store/plants/actions";
import { PlantSuggestions } from "../../store/plants/types";
import parse from "html-react-parser";

interface Parameters {
  id: string;
}

export default function PlantSuggestionDetailsPage() {
  const params: Parameters = useParams();
  const dispatch = useDispatch();
  const plants: PlantSuggestions[] = useSelector(selectSuggestions);
  const { id } = params;

  useEffect(() => {
    if (plants.length) {
      return undefined;
    }
    dispatch(fetchPlantSuggestions());
  }, [dispatch, plants.length]);

  const plant = plants.find((p) => p.id === parseInt(id));

  if (!plant) {
    return <Redirect to="/"></Redirect>;
  }

  // console.log("plants", plants);
  // console.log("plant", plant);

  return (
    <div>
      <h2 className="plant-suggestion-page-title">Plant details</h2>
      <div className="plant-suggestion-page-container">
        <div className="plant-suggestion-information">
          <table style={{ width: "50rem" }} className="plant-suggestion-table">
            <thead>
              <tr>
                <th>Plant information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="plant-suggestion-column-1">Name</td>
                <td>{plant.name}</td>
              </tr>
              <tr>
                <td className="plant-suggestion-column-1">Scientific name</td>
                <td>{plant.scientificName}</td>
              </tr>
              <tr>
                <td className="plant-suggestion-column-1">Description</td>
                <td>{parse(plant.description)}</td>
              </tr>
              <tr>
                <td className="plant-suggestion-column-1">Light</td>
                <td>{plant.light} days</td>
              </tr>
              <tr>
                <td className="plant-suggestion-column-1">Water</td>
                <td>{plant.water}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="plant-suggestion-picture-container">
          <img
            className="plant-suggestion-picture"
            src={plant.imageUrl}
            alt="plant suggestion pic"
          />
        </div>
      </div>
    </div>
  );
}
