import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  VStack,
  Avatar,
  Text,
  FlatList,
  Box,
  HStack,
  Container,
} from "native-base";

var { width } = Dimensions.get("window");
const SearchedProduct = (props) => {
  const { productsFiltered } = props;

  return (
    <View style={styles.listContainer}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => {
          return (
            //   <View key={item.name} style={styles.item}>
            //     <Text>{item.name}</Text>
            //   </View>
            <Box
              width={width}
              borderBottomWidth="2"
              // _dark={{
              //   borderColor: "gray.600",
              // }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack space={3} style={{ alignItems: "center" }}>
                <Avatar
                  size="48px"
                  source={{
                    uri: item.image
                      ? item.image
                      : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                  }}
                />
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.name}
                </Text>
              </HStack>
            </Box>
          );
        })
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  listContainer: {
    width: width,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  item: {
    backgroundColor: "gainsboro",
    marginTop: 10,
  },
});

export default SearchedProduct;
