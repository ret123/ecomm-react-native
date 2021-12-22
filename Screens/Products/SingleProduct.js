import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import { Heading } from "native-base";

var { height } = Dimensions.get("window");
const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [available, setAvailable] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Heading style={styles.contentHeader}>{item.name}</Heading>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.price}>$ {item.price}</Text>
          <Button title="Add" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 24,
  },
});
export default SingleProduct;
