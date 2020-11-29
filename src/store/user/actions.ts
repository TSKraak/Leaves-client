import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import {
  LOGIN_SUCCESS,
  LOG_OUT,
  TOKEN_STILL_VALID,
  UPDATE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  ADD_FAVORITE_USER,
  DELETE_FAVORITE_USER,
  User,
  UserWithoutToken,
  UserActionTypes,
  UpdateUser,
  UpdateUserPassword,
  FollowingUserObject,
} from "./types";
import { AppThunk } from "../types";

const loginSuccess = (userWithToken: User): UserActionTypes => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (
  userWithoutToken: UserWithoutToken
): UserActionTypes => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = (): UserActionTypes => ({ type: LOG_OUT });

export const signUp = (
  firstName: string,
  lastName: string,
  city: string,
  country: string,
  imageUrl: string,
  email: string,
  password: string
): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        firstName,
        lastName,
        city,
        country,
        imageUrl,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "Account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email: string, password: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      // console.log("RESPONSE DATA:", response.data);
      if (response.data.accountBlocked) {
        dispatch(setMessage("danger", true, "Your account has been blocked"));
        dispatch(logOut());
        return dispatch(appDoneLoading());
      }
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "Welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = (): AppThunk => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (!token) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

const updateSuccess = (updateUser: Partial<UpdateUser>): UserActionTypes => {
  return {
    type: UPDATE_SUCCESS,
    payload: updateUser,
  };
};

export const updateProfile = (
  firstName: string | undefined,
  lastName: string | undefined,
  city: string | undefined,
  country: string | undefined,
  imageUrl: string | undefined,
  email: string | undefined
): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const response = await axios.patch(
        `${apiUrl}/user`,
        {
          firstName,
          lastName,
          city,
          country,
          imageUrl,
          email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updateSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "Profile updated."));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

const updatePasswordSuccess = (
  updateUserPassword: UpdateUserPassword
): UserActionTypes => {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    payload: updateUserPassword,
  };
};

export const updatePassword = (password: string | undefined): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());

    try {
      const response = await axios.patch(
        `${apiUrl}/user/password`,
        {
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updatePasswordSuccess(response.data));
      dispatch(
        showMessageWithTimeout("success", true, "Password succesfully updated.")
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

const setNewFavoriteUser = (
  newFollowingUsers: FollowingUserObject
): UserActionTypes => {
  return {
    type: ADD_FAVORITE_USER,
    payload: newFollowingUsers,
  };
};

export const addFavoriteUser = (followingUserId: number): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(appLoading());
  const token = selectToken(getState());
  const newFollowingUser = { id: followingUserId, followingUsers: {} };

  try {
    await axios.post(
      `${apiUrl}/user/follow/`,
      { followingUserId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch(setMessage("success", true, "Started following user."));
    dispatch(setNewFavoriteUser(newFollowingUser));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage("danger", true, error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage("danger", true, error.message));
    }
  }
  dispatch(appDoneLoading());
};

const deleteFavoriteUser = (
  newFollowingUsers: FollowingUserObject[]
): UserActionTypes => {
  return {
    type: DELETE_FAVORITE_USER,
    payload: newFollowingUsers,
  };
};

export const removeFavoriteUser = (followingUserId: number): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(appLoading());
  const token = selectToken(getState());
  const followingUsers = getState().user.following;

  const newFollowingUsers = followingUsers?.filter(
    (user) => user.id !== followingUserId
  );

  try {
    await axios.delete(`${apiUrl}/user/follow/${followingUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setMessage("success", true, "User successfully unfollowed."));
    dispatch(deleteFavoriteUser(newFollowingUsers));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage("danger", true, error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage("danger", true, error.message));
    }
  }
  dispatch(appDoneLoading());
};
