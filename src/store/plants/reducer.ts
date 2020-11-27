import {
  ADD_ALL_PLANTS,
  ADD_PLANT_SUGGESTIONS,
  PlantActionTypes,
  PlantsState,
} from "./types";

const initialState: PlantsState = {
  suggestions: [],
  all: [],
};

// eslint-disable-next-line
export default (state = initialState, action: PlantActionTypes) => {
  switch (action.type) {
    case ADD_PLANT_SUGGESTIONS:
      return { ...state, suggestions: action.payload };

    case ADD_ALL_PLANTS:
      return { ...state, all: action.payload };

    default:
      return state;
  }
};
