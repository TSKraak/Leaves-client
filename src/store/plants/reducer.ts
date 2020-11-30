import {
  ADD_ALL_PLANTS,
  ADD_FAVORITE_USER_PLANTS,
  ADD_NEW_COMMENT,
  ADD_PLANT_DETAILS,
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
  plantDetails: {
    id: 0,
    name: "",
    scientificName: "",
    description: "",
    imageUrl: "",
    waterPeriodDays: 0,
    waterAlert: "",
    fertilisePeriodDays: 0,
    fertiliseAlert: "",
    createdAt: "",
    updatedAt: "",
    user: {
      id: 0,
      email: "",
      accountBlocked: false,
      createdAt: "",
      updatedAt: "",
      following: [],
    },
    comments: [],
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

    case ADD_PLANT_DETAILS:
      return {
        ...state,
        plantDetails: { ...state.plantDetails, ...action.payload },
      };

    case ADD_NEW_COMMENT:
      return {
        ...state,
        plantDetails: {
          ...state.plantDetails,
          comments: [...state.plantDetails.comments, action.payload],
        },
      };

    default:
      return state;
  }
};
