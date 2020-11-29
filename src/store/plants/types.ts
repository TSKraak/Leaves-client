import { FollowingUserObject, User } from "../user/types";

export const ADD_PLANT_SUGGESTIONS = "ADD_PLANT_SUGGESTIONS";
export const ADD_ALL_PLANTS = "ADD_ALL_PLANTS";
export const ADD_MY_PLANTS = "ADD_MY_PLANTS";
export const ADD_FAVORITE_USER_PLANTS = "ADD_FAVORITE_USER_PLANTS";
export const ADD_PLANT_DETAILS = "ADD_PLANT_DETAILS";

export interface PlantsState {
  suggestions: PlantSuggestions[];
  all: Plant[];
  favoriteUserPlants: UserWithFavoriteUsers;
  plantDetails: Plant;
}

export interface PlantSuggestions {
  id: number;
  name: string;
  scientificName?: string;
  imageUrl?: string;
  shortDescription?: string;
  description?: string;
  shortLight?: string;
  light?: string;
  shortWater?: string;
  water?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Plant {
  id: number;
  name: string;
  scientificName?: string;
  description?: string;
  imageUrl?: string;
  waterPeriodDays?: number;
  fertilisePeriodDays?: number;
  waterAlert?: string;
  fertiliseAlert?: string;
  userId?: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface FavoriteUserWithPlants {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  imageUrl: string;
  accountBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  plants: Plant[];
  following: FollowingUserObject[];
  followingUsers: {
    followingUserId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UserWithFavoriteUsers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  imageUrl: string;
  accountBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  following: FavoriteUserWithPlants[];
}

interface AddPlantSuggestionsAction {
  type: typeof ADD_PLANT_SUGGESTIONS;
  payload: PlantSuggestions[];
}

interface AddAllPlantsAction {
  type: typeof ADD_ALL_PLANTS;
  payload: Plant[];
}

interface AddMyPlantsAction {
  type: typeof ADD_MY_PLANTS;
  payload: Plant[];
}

interface AddFavoriteUserPlantsAction {
  type: typeof ADD_FAVORITE_USER_PLANTS;
  payload: UserWithFavoriteUsers;
}

interface AddPlantDetailsAction {
  type: typeof ADD_PLANT_DETAILS;
  payload: Plant;
}

export type PlantActionTypes =
  | AddPlantSuggestionsAction
  | AddAllPlantsAction
  | AddMyPlantsAction
  | AddFavoriteUserPlantsAction
  | AddPlantDetailsAction;
