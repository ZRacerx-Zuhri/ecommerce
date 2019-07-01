import Axios from "axios";
import cookies from "universal-cookie";

const cookie = new cookies();

export const onLoginUser = (user, pass) => {
  return dispatch => {
    Axios.get("http://localhost:2019/users", {
      params: {
        username: user,
        password: pass
      }
    }).then(res => {
      if (res.data.length > 0) {
        const { id, username } = res.data[0];
        dispatch({
          type: "LOGIN SUCCESS",
          payload: {
            id: id,
            username: username
          }
        });
        cookie.set("userName", { id, username });
      } else {
        console.log("Gagal");
      }
    });
  };
};
export const keeplogin = objuser => {
  return {
    type: "LOGIN SUCCESS",
    payload: {
      id: objuser.id,
      username: objuser.username
    }
  };
};

export const onLogoutUser = () => {
  cookie.remove("userName");

  return {
    type: "LOGOUT_SUCCESS"
  };
};
