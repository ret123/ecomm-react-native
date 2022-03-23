import jwt_decode from "jwt-decode";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
  axios
    .post(`${baseURL}/users/login`, user, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => {
      console.log(res.data);
      if (res.data.token) {
        const token = res.data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, user));
        ToastAndroid.showWithGravityAndOffset(
          "Login Successful",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        logoutUser(dispatch);
      }
    })
    .catch(err => {
      console.log(err.response.data);
      ToastAndroid.showWithGravityAndOffset(
        err.response.data,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    });
  //   const toast = useToast();

  //   fetch(`${baseURL}/users/login`, {
  //     method: "POST",
  //     body: JSON.stringify(user),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       if (data) {
  //         const token = data.token;
  //         AsyncStorage.setItem("jwt", token);
  //         const decoded = jwt_decode(token);
  //         dispatch(setCurrentUser(decoded, user));
  //       } else {
  //         logoutUser(dispatch);
  //       }
  //     })
  //     .catch(err => {
  //       //   toast.show({
  //       //     top,
  //       //     type: "error",
  //       //     title: "Please provide correct credentials"
  //       //   });
  //       logoutUser(dispatch);
  //     });
};

export const getUserProfile = id => {
  fetch(`${baseURL}/users/${id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
};

export const logoutUser = dispatch => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user
  };
};
