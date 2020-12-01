import { RootState } from "../rootReducer";
import { Plant, ReminderData } from "./types";

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

export const selectSearchResults = (state: RootState) =>
  state.plants.searchResults;

export const selectReminderData = (state: RootState) => {
  const reminders: ReminderData[] = [];

  const plants = state.plants.all;
  const myPlants = plants.filter((plant) => plant.user.id === state.user.id);

  myPlants.forEach((plant) => {
    const reminderData = {
      title: `Water ${plant.name}`,
      startDate: new Date(`${plant.waterAlert}T10:00:00Z`),
      endDate: new Date(`${plant.waterAlert}T11:00:00Z`),
    };

    reminders.push(reminderData);
  });

  myPlants.forEach((plant) => {
    const reminderData = {
      title: `Fertilise ${plant.name}`,
      startDate: new Date(`${plant.fertiliseAlert}T10:00:00Z`),
      endDate: new Date(`${plant.fertiliseAlert}T11:00:00Z`),
    };

    reminders.push(reminderData);
  });

  return reminders;
};
