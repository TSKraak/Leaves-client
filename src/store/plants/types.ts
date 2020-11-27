export const ADD_PLANT_SUGGESTIONS = "ADD_PLANT_SUGGESTIONS";

export interface PlantsState {
  suggestions: PlantSuggestions[];
}

export interface PlantSuggestions {
  id?: number;
  name?: string;
  scientificName?: string;
  imageUrl?: string;
  shortDescription?: string;
  description?: string;
  shortLight?: string;
  light?: string;
  shortWater?: string;
  water?: string;
  createdAt?: string;
  updatedAt?: string;
}

// export interface AddPlantSuggestions {
//   name: string;
//   scientificName: string;
//   imageUrl: string;
//   shortDescription: string;
//   description: string;
//   light: string;
//   water: string;
//   createdAt: string;
//   updatedAt: string;
// }

interface AddPlantSuggestionsAction {
  type: typeof ADD_PLANT_SUGGESTIONS;
  payload: PlantSuggestions[];
}

export type PlantActionTypes = AddPlantSuggestionsAction;
