import { apiUrl } from "../../config/constants";
import axios from "axios";
import { AppThunk } from "../types";
import {
  appDoneLoading,
  appLoading,
  setMessage,
  showMessageWithTimeout,
} from "../appState/actions";
import {
  ADD_ALL_PLANTS,
  ADD_PLANT_SUGGESTIONS,
  ADD_FAVORITE_USER_PLANTS,
  Plant,
  PlantActionTypes,
  PlantSuggestions,
  UserWithFavoriteUsers,
  ADD_PLANT_DETAILS,
} from "./types";
import { selectToken } from "../user/selectors";

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

const addFavoriteUserPlants = (
  favoriteUserPlants: UserWithFavoriteUsers
): PlantActionTypes => {
  return { type: ADD_FAVORITE_USER_PLANTS, payload: favoriteUserPlants };
};

export const fetchFavoriteUserPlants = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const res = await axios.get(`${apiUrl}/plants/following`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const plants = res.data;

      dispatch(addFavoriteUserPlants(plants));
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

const addPlantDetails = (plantDetails: Plant): PlantActionTypes => {
  return { type: ADD_PLANT_DETAILS, payload: plantDetails };
};

export const fetchPlantDetails = (id: number): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const res = await axios.get(`${apiUrl}/plants/plant/${id}`);
      const plant = res.data;

      dispatch(addPlantDetails(plant));
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

export const updatePlant = (
  id: number,
  name: string,
  scientificName?: string,
  description?: string,
  imageUrl?: string,
  waterPeriodDays?: number,
  waterAlert?: string,
  fertilisePeriodDays?: number,
  fertiliseAlert?: string
): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const response = await axios.patch(
        `${apiUrl}/plants/plant/${id}`,
        {
          name,
          scientificName,
          description,
          imageUrl,
          waterPeriodDays,
          waterAlert,
          fertilisePeriodDays,
          fertiliseAlert,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedPlant = response.data;

      dispatch(addPlantDetails(updatedPlant));
      dispatch(
        showMessageWithTimeout("success", true, "Leaf successfully updated.")
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
