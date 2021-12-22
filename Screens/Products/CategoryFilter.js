import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Badge, Text } from "native-base";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      height={60}
      style={{ backGroundColor: "#f2f2f2" }}
    >
      <TouchableOpacity
        key={1}
        style={{ justifyContent: "center" }}
        onPress={() => {
          props.categoryFilter("all"), props.setActive(-1);
        }}
      >
        <Badge
          variant="solid"
          colorScheme="danger"
          rounded="10px"
          style={[
            styles.center,
            { margin: 5 },
            props.active == -1 ? styles.active : styles.inactive,
          ]}
        >
          <Text style={{ color: "white" }}>All</Text>
        </Badge>
      </TouchableOpacity>
      {props.categories.map((item) => (
        <TouchableOpacity
          key={item._id}
          style={{ justifyContent: "center" }}
          onPress={() => {
            props.categoryFilter(item._id.$oid),
              props.setActive(props.categories.indexOf(item));
          }}
        >
          <Badge
            variant="solid"
            colorScheme="danger"
            rounded="10px"
            style={[
              styles.center,
              { margin: 5 },
              props.active == props.categories.indexOf(item)
                ? styles.active
                : styles.inactive,
            ]}
          >
            <Text style={{ color: "white" }}>{item.name}</Text>
          </Badge>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});

export default CategoryFilter;
