import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "native-base";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

const Login = (user, dispatch) => {
  const toast = useToast();
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
      } else {
        logoutUser(dispatch);
      }
    })
    .catch(err => {
      toast.show({
        placement: "top",
        status: "error",
        title: "Please provide correct credentials"
      });
      console.log(err.response.data);
    });
};

export default Login;
