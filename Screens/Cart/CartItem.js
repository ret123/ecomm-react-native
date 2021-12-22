import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Heading,
  Text,
  Image,
  Center,
  Box,
  HStack,
  FlatList,
  VStack,
  Spacer,
  Button,
} from "native-base";
import cartItems from "../../Redux/Reducers/cartItem";

const CartItem = (props) => {
  const product = props.item.product;
  const [quantity, setQuantity] = useState(props.item.item.quantity);
  return (
    <View>
      <Text>{product.name}</Text>
    </View>
  );
};

export default CartItem;
