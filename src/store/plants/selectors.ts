import { RootState } from "../rootReducer";
import { Plant } from "./types";

export const selectSuggestions = (state: RootState) => state.plants.suggestions;
export const selectAllPlants = (state: RootState) => {
  const plants = state.plants.all;
  const sortedPlants = plants.sort(function (a, b) {
    return b.id - a.id;
  });
  return sortedPlants;
};

export const selectMyPlants = (state: RootState) => {
  const plants = state.plants.all;
  const myPlants = plants.filter((plant) => plant.user.id === state.user.id);
  const sortedPlants = myPlants.sort(function (a, b) {
    return b.id - a.id;
  });
  return sortedPlants;
};

export const selectFavoriteUsersPlants = (state: RootState) => {
  const plants: Plant[] = [];

  state.plants.favoriteUserPlants.following.forEach((user) => {
    user.plants.forEach((plant) => {
      const extendedPlant = {
        ...plant,
        user,
      };

      plants.push(extendedPlant);
    });
  });

  const sortedPlants = plants.sort(function (a, b) {
    return b.id - a.id;
  });

  return sortedPlants;
};

export const selectPlantDetails = (state: RootState) =>
  state.plants.plantDetails;
