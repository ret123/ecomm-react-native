import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  Container,
  Icon,
  Item,
  Input,
  Text,
  IconButton,
  VStack,
  Flex,
  Spacer,
  Box,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const data = require("../../assets/data/products.json");
const productsCategories = require("../../assets/data/categories.json");
var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);

      setActive(-1);

      axios
        .get(`${baseURL}/products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setInitialState(res.data);
          setProductsCtg(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Api Error");
        });

      axios
        .get(`${baseURL}/categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api Error");
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const openList = () => {
    setFocus(true);
    console.log(focus);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories

  const changeCategory = (cat) => {
    {
      cat === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(products.filter((i) => i.category._id === cat)),
            setActive(true),
          ];
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
            backgroundColor: "#f2f2f2",
          }}
        >
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View>
          <VStack
            space={10}
            width="90%"
            mb={5}
            mx={4}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Input
              placeholder="Search"
              variant="filled"
              width="100%"
              bg="gray.200"
              borderRadius={10}
              onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
              py={1}
              px={2}
              mx={2}
              _web={{
                _focus: {
                  borderColor: "muted.300",
                  style: { boxShadow: "none" },
                },
              }}
              InputLeftElement={
                <Icon
                  size="sm"
                  ml={2}
                  size={5}
                  color="gray.400"
                  as={<Ionicons name="ios-search" />}
                />
              }
              InputRightElement={
                <Icon
                  as={Ionicons}
                  onPress={onBlur}
                  name="close"
                  color="gray.400"
                  style={{ marginRight: 5 }}
                  size={5}
                />
              }
            />
          </VStack>
          <ScrollView>
            {focus == true ? (
              <SearchedProduct productsFiltered={productsFiltered} />
            ) : (
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCategory}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item.name}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No products found</Text>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    height: "100%",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
