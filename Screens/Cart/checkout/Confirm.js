import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
import { Text, Image, Box } from "native-base";
import { useDispatch } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

var { height, width } = Dimensions.get("window");
const Confirm = (props) => {
  const dispatch = useDispatch();

  const confirmOrder = () => {
    setTimeout(() => {
      dispatch(actions.clearCart());
      props.navigation.navigate("Cart");
    }, 500);
  };
  const confirm = props.route.params;
  // useEffect(() => {
  //   console.log(confirm);
  // }, [confirm]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
        {props.route.params ? (
          <View
            style={{ borderWidth: 1, borderColor: "orange", marginTop: 10 }}
          >
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {confirm.order.order.shippingAddress1}</Text>
              <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
              <Text>City: {confirm.order.order.city}</Text>
              <Text>Zip: {confirm.order.order.zip}</Text>
              <Text>Country: {confirm.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((item) => {
              return (
                <Box style={styles.items}>
                  <Image
                    size="12"
                    source={{ uri: item.product.image }}
                    alt="react-native"
                  />
                  <View style={styles.body}>
                    <Text style={{ marginRight: 10 }}>{item.product.name}</Text>
                    <Text>${item.product.price}</Text>
                  </View>
                </Box>
              );
            })}
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title={"Place Order"} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  items: {
    width: width / 1.2,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Confirm;
