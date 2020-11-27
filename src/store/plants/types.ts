import { User } from "../user/types";

export const ADD_PLANT_SUGGESTIONS = "ADD_PLANT_SUGGESTIONS";
export const ADD_ALL_PLANTS = "ADD_ALL_PLANTS";

export interface PlantsState {
  suggestions: PlantSuggestions[];
  all: Plant[];
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

export interface Plant {
  id?: number;
  name?: string;
  scientificName?: string;
  description?: string;
  imageUrl?: string;
  waterPeriodDays?: number;
  fertilisePeriodDays?: number;
  waterAlert?: string;
  fertiliseAlert?: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  user: User;
}

interface AddPlantSuggestionsAction {
  type: typeof ADD_PLANT_SUGGESTIONS;
  payload: PlantSuggestions[];
}

interface AddAllPlantsAction {
  type: typeof ADD_ALL_PLANTS;
  payload: Plant[];
}

export type PlantActionTypes = AddPlantSuggestionsAction | AddAllPlantsAction;
