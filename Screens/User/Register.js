import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useToast } from "native-base";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toast = useToast();

  const handleSubmit = () => {
    if (email === "" || name === "" || password === "" || phone === "") {
      setError("Please fill all fields");
    }
    let user = {
      email: email,
      name: name,
      phone: phone,
      password: password,
      isAdmin: false,
    };
    axios
      .post(`${baseURL}/users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          toast.show({
            title: "Register Successfully",
            status: "success",
            description: "Thanks for signing up with us.",
            placement: "top",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((err) => {
        toast.show({
          title: "Registeration failed",
          status: "error",
          description: "Please try again",
          placement: "top",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Enter Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Enter Name"}
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => setName(text.toLowerCase())}
        />
        <Input
          placeholder={"Enter Phone"}
          name={"phone"}
          id={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text.toLowerCase())}
        />
        <Input
          placeholder={"Enter Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View>{error ? <Error message={error} /> : null}</View>
        <View>
          <Button title={"Register"} onPress={handleSubmit} />
        </View>
        <View style={([styles.buttonGroup], { marginTop: 40 })}>
          <Text style={{ marginBottom: 20, alignItems: "center" }}>
            Already have an account?
          </Text>
          <Button
            title="Login"
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
});

export default Register;
