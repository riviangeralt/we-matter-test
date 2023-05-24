import {
  getAllUsersSliceReducer,
  getSingleUserSliceReducer,
  deleteUserSliceReducer,
  updateUserSliceReducer,
  createUserSliceReducer,
} from "../../slices/users";

export const usersReducers = {
  getAllUsers: getAllUsersSliceReducer,
  getSingleUser: getSingleUserSliceReducer,
  deleteUser: deleteUserSliceReducer,
  updateUser: updateUserSliceReducer,
  createUser: createUserSliceReducer,
};
