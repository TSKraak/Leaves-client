import { RootState } from "../rootReducer";

export const selectSuggestions = (state: RootState) => state.plants.suggestions;
