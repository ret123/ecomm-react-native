import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cartItems);

  return (
    <>
      {cartItems.length > 0 ? (
        <Badge
          colorScheme="danger"
          rounded="999px"
          bg="red.500"
          variant="solid"
          style={styles.badge}
        >
          <Text style={styles.text}>{cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    width: 10,
    fontWeight: "bold",
  },
});

export default CartIcon;
