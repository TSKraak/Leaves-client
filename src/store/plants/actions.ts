import { apiUrl } from "../../config/constants";
import axios from "axios";
import { AppThunk } from "../types";
import { appDoneLoading, appLoading, setMessage } from "../appState/actions";
import {
  ADD_ALL_PLANTS,
  ADD_PLANT_SUGGESTIONS,
  Plant,
  PlantActionTypes,
  PlantSuggestions,
} from "./types";

const addPlantSuggestions = (
  plantSuggestions: PlantSuggestions[]
): PlantActionTypes => {
  return { type: ADD_PLANT_SUGGESTIONS, payload: plantSuggestions };
};

export const fetchPlantSuggestions = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    try {
      const res = await axios.get(`${apiUrl}/plants/suggestions`);
      const plants = res.data;

      dispatch(addPlantSuggestions(plants));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
    dispatch(appDoneLoading());
  };
};

const addAllPlants = (allPlants: Plant[]): PlantActionTypes => {
  return { type: ADD_ALL_PLANTS, payload: allPlants };
};

export const fetchAllPlants = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    try {
      const res = await axios.get(`${apiUrl}/plants`);
      const plants = res.data;

      dispatch(addAllPlants(plants));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
    }
    dispatch(appDoneLoading());
  };
};
