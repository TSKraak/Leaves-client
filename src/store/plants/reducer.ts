import { ADD_PLANT_SUGGESTIONS, PlantActionTypes, PlantsState } from "./types";

const initialState: PlantsState = {
  suggestions: [],
};

// eslint-disable-next-line
export default (state = initialState, action: PlantActionTypes) => {
  switch (action.type) {
    case ADD_PLANT_SUGGESTIONS:
      return { ...state, suggestions: action.payload };

    default:
      return state;
  }
};
