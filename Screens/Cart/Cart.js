import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from "react-native";
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
  CloseIcon,
} from "native-base";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";
import * as actions from "../../Redux/Actions/cartActions";
import CartItem from "./CartItem";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  useEffect(() => {
    console.log(cartItems);
  }, []);

  var total = 0;
  cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View>
        <HStack space={3} justifyContent="space-between">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              size="80px"
              resizeMode={"contain"}
              source={{
                uri: data.item.product.image
                  ? data.item.product.image
                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
              }}
              mr={10}
              ml={2}
            />
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
            >
              {data.item.product.name}
            </Text>
          </View>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text
              fontSize="md"
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              mr={2}
            >
              ${data.item.product.price}
            </Text>
          </View>
        </HStack>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => dispatch(actions.removeFromCart(data.item))}
      >
        <CloseIcon size="4" />
        {/* <Text style={styles.backTextWhite}>Delete</Text> */}
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      <Center>
        <Heading>Cart</Heading>
      </Center>

      {cartItems.length ? (
        <View style={{ flex: 1 }}>
          <Box style={{ flex: 1 }}>
            <SwipeListView
              data={cartItems}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            />
            {/* <FlatList
              data={cartItems}
              renderItem={({ item }) => <CartItem item={item} />}
              keyExtractor={(item) => item.product._id}
            /> */}

            <View style={styles.totalPrice}>
              <Text style={styles.price}>$ {total}</Text>
            </View>
          </Box>

          <View style={styles.bottomContainer}>
            <Button
              onPress={() => dispatch(actions.clearCart())}
              size="sm"
              colorScheme="secondary"
            >
              Clear
            </Button>
            <Spacer />
            <Button
              onPress={() => props.navigation.navigate("Checkout")}
              size="sm"
            >
              Checkout
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Your Cart is Empty!</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    width: width,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 30,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
    // bottom: 0,
    margin: 20,

    // marginLeft: 0,
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 30,
    marginTop: 20,
  },
  price: {
    color: "red",
    fontSize: 18,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
  rowFront: {
    // alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 100,
    // marginTop: 10,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});

// const mapStateToProps = (state) => {
//   const { cartItems } = state;
//   return {
//     cartItems: cartItems,
//   };
// };

// export default connect(mapStateToProps, null)(Cart);
export default Cart;
