import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
} from "react-native";
import { useToast } from "native-base";

// import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const product = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: product.image
            ? product.image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {product.name.length > 15
          ? product.name.substring(0, 15 - 3) + "..."
          : product.name}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
      {product.countInStock > 0 ? (
        <View style={{ marginBottom: 80 }}>
          <Button
            title={"Add"}
            color={"green"}
            onPress={() => {
              dispatch(actions.addToCart({ quantity: 1, product }));
              toast.show({
                title: `${product.name} added to Cart`,
                status: "success",
                description: "Go to Cart to complete the order",
                placement: "top",
              });
            }}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 2,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addItemToCart: (product) => {
//       dispatch(actions.addToCart({ quantity: 1, product }));
//     },
//   };
// };
// export default connect(null, mapDispatchToProps)(ProductCard);
export default ProductCard;
