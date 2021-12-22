import React from "react";
import { Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const CartHooks = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);

  return (
    <View style={{ flex: 1 }}>
      {cartItems.map((item) => {
        return <Text>{item.product.name}</Text>;
      })}
    </View>
  );
};

export default CartHooks;
