import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Select } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { useDispatch, useSelector } from "react-redux";

const countries = require("../../../assets/data/countries.json");

export default function Checkout() {
  const cartItems = useSelector((state) => state.cartItems);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(cartItems);
    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingaddress: 2,
      zip,
    };
    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Address"}
          name={"address"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Address 2"}
          name={"address2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setCity(text)}
        />
        <Select
          placeholder="Select Country"
          selectedValue={country}
          minWidth="320"
          itemStyle={{ borderColor: "orange", backgroundColor: "orange" }}
          onValueChange={(itemValue) => setCountry(itemValue)}
          style={{ borderColor: "orange" }}
        >
          {countries.map((country) => {
            return (
              <Select.Item
                label={country.name}
                value={country.name}
                key={country.code}
              />
            );
          })}
        </Select>

        <View style={{ width: "80%", alignItems: "center", marginTop: 20 }}>
          <Button onPress={() => checkOut()} title="Confirm" />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
}
