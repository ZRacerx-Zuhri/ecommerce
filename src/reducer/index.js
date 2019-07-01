import { combineReducers } from "redux";

const init = {
  id: "",
  username: ""
};

const AuthReducer = (data = init, action) => {
  switch (action.type) {
    case "LOGIN SUCCESS":
      return {
        ...data,
        id: action.payload.id,
        username: action.payload.username
      };
    case "LOGOUT_SUCCESS":
      return {
        ...data,
        id: "",
        username: ""
      };

    default:
      return data;
  }
};

export default combineReducers({ aut: AuthReducer });
