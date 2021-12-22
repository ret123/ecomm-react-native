import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, LogBox, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import store from "./Redux/store";

import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Shared/Header";
import Main from "./Navigators/Main";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Header />
          <Main />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
