import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import RestCard from "../components/RestCard";
import PopularMeal from "../components/PopularMeal";
import { FlatList } from "react-native";
import { ScrollView, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";

const menuItems = [
  {
    itemId: "1",
    itemName: "Classic Burger",
    itemDescription: "Juicy beef patty with lettuce, tomato, and cheese",
    price: 9.99,
    catigory: "Meals",
  },
  {
    itemId: "2",
    itemName: "Chicken Shawarma Wrap",
    itemDescription:
      "Grilled chicken with garlic sauce and veggies wrapped in pita",
    price: 12.99,
    catigory: "Sandwiches",
  },
  {
    itemId: "3",
    itemName: "Margherita Pizza",
    itemDescription: "Classic pizza with fresh mozzarella, tomatoes, and basil",
    price: 10.99,
    catigory: "Special",
  },
  {
    itemId: "4",
    itemName: "Classic Burger",
    itemDescription: "Juicy beef patty with lettuce, tomato, and cheese",
    price: 9.99,
    catigory: "Meals",
  },
  {
    itemId: "12",
    itemName: "Chicken Shawarma Wrap",
    itemDescription:
      "Grilled chicken with garlic sauce and veggies wrapped in pita",
    price: 12.99,
    catigory: "Sandwiches",
  },
  {
    itemId: "9",
    itemName: "Margherita Pizza",
    itemDescription: "Classic pizza with fresh mozzarella, tomatoes, and basil",
    price: 10.99,
    catigory: "Special",
  },
  // Add more items as needed
];

const restaurants = [
  {
    title: "Cuisine Delight",
    rating: 4.5,
    description: "A delightful blend of flavors from around the world.",
  },
  {
    title: "Sizzle Grill",
    rating: 4.2,
    description: "Grilled perfection with a touch of smoky goodness.",
  },
  {
    title: "Pasta Paradise",
    rating: 4.8,
    description:
      "Authentic Italian pasta dishes that will transport you to Italy.",
  },
  {
    title: "Spice Haven",
    rating: 4.0,
    description: "Bold and flavorful dishes from various spice-rich cuisines.",
  },
  {
    title: "Ocean Breeze Seafood",
    rating: 4.6,
    description: "Fresh seafood served with a side of ocean views.",
  },
];

const CafiteriaHome = () => {
  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", marginTop: 20, width: "100%" }}>
        <Text style={styles.title}>
          Hello,{" "}
          <Text
            style={{ ...styles.title, color: "#8F0FF0", fontWeight: "bold" }}
          >
            Ahmad
          </Text>
        </Text>
        {/* Wrap the content inside TouchableOpacity */}
        <TouchableOpacity
          onPress={() => {
            // Handle onPress action
            console.log("My Orders pressed");
          }}
          style={{ position: "absolute", right: 12, flexDirection: "row" }}
        >
          <Text style={{ color: "#8F0FF0", fontSize: 20 }}>My Orders</Text>
          <Icon name="food" style={styles.icon} size={22} />
        </TouchableOpacity>
      </View>
      <Text style={styles.descTxt}>Which restaurant today? 😋</Text>
      {/* <View style={styles.searchBarCont}>
        <Icon name="search" style={styles.icon} size={20} />

        <TextInput
          style={styles.searchBar}
          placeholder="Search Restaurants..."
          onChangeText={(text) => setSearch(text)}
        />
      </View> */}
      <View
        style={{
          height: "45%",
        }}
      >
        <View style={{ height: "99%" }}>
          <FlatList
            data={restaurants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <RestCard {...item} />}
            contentContainerStyle={{ marginBottom: 10 }}
          />
        </View>
      </View>
      <Text style={{ ...styles.title, fontWeight: "bold", marginTop: 5 }}>
        Popular Meals ️‍🔥
      </Text>
      <FlatList
        horizontal
        data={menuItems}
        keyExtractor={(item) => item.itemId}
        renderItem={({ item }) => <PopularMeal item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
  },
  descTxt: {
    marginLeft: 10,
    marginBottom: 20,
    fontSize: 15,
    color: "gray",
    fontWeight: "400",
  },
  searchBarCont: {
    height: 40,
    width: "90%",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    flexDirection: "row",
    alignSelf: "center",
  },
  searchBar: {
    marginLeft: 10,
  },
  icon: {
    color: "#8F00FF",
    marginLeft: 10,
  },
});

export default CafiteriaHome;
