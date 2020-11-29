import FavoriteLeaves from "../../components/FavoriteLeaves";
import {
  ADD_ALL_PLANTS,
  ADD_FAVORITE_USER_PLANTS,
  ADD_PLANT_SUGGESTIONS,
  PlantActionTypes,
  PlantsState,
} from "./types";

const initialState: PlantsState = {
  suggestions: [],
  all: [],
  favoriteUserPlants: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    imageUrl: "",
    accountBlocked: false,
    createdAt: "",
    updatedAt: "",
    following: [],
  },
};

// eslint-disable-next-line
export default (state = initialState, action: PlantActionTypes) => {
  switch (action.type) {
    case ADD_PLANT_SUGGESTIONS:
      return { ...state, suggestions: action.payload };

    case ADD_ALL_PLANTS:
      return { ...state, all: action.payload };

    case ADD_FAVORITE_USER_PLANTS:
      return { ...state, favoriteUserPlants: action.payload };

    default:
      return state;
  }
};
