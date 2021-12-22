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
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      py="2"
    >
      <HStack space={3} justifyContent="space-between">
        <Image
          size="80px"
          resizeMode={"contain"}
          source={{
            uri: product.image
              ? product.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
        <VStack>
          <Text
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            bold
          >
            {product.name}
          </Text>
          {/* <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {item.product.description}
            </Text> */}
        </VStack>
        <Spacer />
        <Text
          fontSize="xs"
          _dark={{
            color: "warmGray.50",
          }}
          color="coolGray.800"
          alignSelf="flex-start"
        >
          ${product.price}
        </Text>
      </HStack>
    </Box>
  );
};

export default CartItem;
