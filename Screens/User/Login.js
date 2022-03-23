import React, { useEffect, useContext, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/authActions";

const Login = props => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("UserProfile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password
    };
    if (email === "" || password === "") {
      setError("Please fill in the credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <Button title="Login" onPress={handleSubmit} />
      </View>
      <View style={([styles.buttonGroup], { marginTop: 40 })}>
        <Text style={{ marginBottom: 20, alignItems: "center" }}>
          Dont have an account?
        </Text>
        <Button
          title="Register"
          onPress={() => props.navigation.navigate("Register")}
        />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center"
  }
});

export default Login;
