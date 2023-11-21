import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import RestCard from "../components/RestCard";
import MenuItem from "../components/MenuItem";
import { FlatList } from "react-native";
import { ScrollView, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../components/CustomButton";
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
  // Add more items as needed
];
const RestaurantScreen = () => {
  const [search, setSearch] = useState("");
  const uniqueCategories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.catigory))),
  ];
  const [selectedCategory, setSelectedCategory] = useState(uniqueCategories[0]);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", marginTop: 20, width: "100%" }}>
        <Text style={{ ...styles.title }}>
          Welcome,{" "}
          <Text
            style={{ ...styles.title, color: "#8F00FF", fontWeight: "bold" }}
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
          <Text style={{ color: "#8F00FF", fontSize: 20 }}>My Orders</Text>
          <Icon
            name="food"
            style={{ ...styles.icon, color: "#8F00F0" }}
            size={22}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.descTxt}>What do you wanna eat? 😋</Text>
      <View style={styles.searchBarCont}>
        <Ionicons name="search" style={styles.icon} size={20} />

        <TextInput
          style={styles.searchBar}
          placeholder="Search Menu..."
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 10, flexDirection: "row", height: 80 }}
      >
        {uniqueCategories.map((category) => (
          <CustomButton
            key={category}
            text={category}
            type={category === selectedCategory ? "Selected" : "NotSelected"}
            onPress={() => handleCategoryClick(category)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={menuItems}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={(item) => item.itemId}
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
    height: 50,
    borderRadius: 10,

    padding: 8,
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "#f0f2f5",
  },
  searchBar: {
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
    alignSelf: "center",
  },
});
export default RestaurantScreen;
