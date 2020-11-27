import { RootState } from "../rootReducer";

export const selectSuggestions = (state: RootState) => state.plants.suggestions;
export const selectAllPlants = (state: RootState) => state.plants.all;
