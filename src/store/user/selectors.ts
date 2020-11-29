import { RootState } from "../rootReducer";

export const selectToken = (state: RootState) => state.user.token;

export const selectUser = (state: RootState) => state.user;

export const selectFollowingUsers = (state: RootState) => {
  const followingUsers = state.user.following?.map((user) => user.id);
  return followingUsers;
};
