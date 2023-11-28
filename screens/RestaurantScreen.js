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
import { BlurView } from "@react-native-community/blur";
import Animated, { FadeOutDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

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
const RestaurantScreen = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [orderContent, setOrderContent] = useState([]);
  const uniqueCategories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.catigory))),
  ];
  const [selectedCategory, setSelectedCategory] = useState(uniqueCategories[0]);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearch("");
  };
  function filterItemsByCategory(items, selectedCategory) {
    if (selectedCategory === "All") {
      return items;
    }
    return items.filter((item) => item.catigory === selectedCategory);
  }
  const filteredMenu = filterItemsByCategory(menuItems, selectedCategory);
  const filteredMenuItems = filteredMenu.filter((item) =>
    item.itemName.toLowerCase().includes(search.toLowerCase())
  );
  const totalPrice = orderContent.reduce(
    (acc, item) => acc + item.Quantity * item.price,
    0
  );

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
            navigation.navigate("MyOrders");
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
          placeholder={
            selectedCategory === "All"
              ? `Search Menu...`
              : `Search ${selectedCategory}...`
          }
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: "row",
            height: 80,
            marginTop: 5,
          }}
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
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredMenuItems}
          renderItem={({ item }) => (
            <MenuItem
              item={item}
              setOrderContent={setOrderContent}
              orderContent={orderContent}
            />
          )}
          keyExtractor={(item) => item.itemId}
          contentContainerStyle={{
            paddingBottom: orderContent.length !== 0 ? 120 : 0,
          }}
        />
      </View>
      {orderContent.length !== 0 && (
        <Animated.View
          style={styles.footer}
          entering={FadeInUp.duration(200).springify().damping(10)}
          exiting={FadeOutDown.duration(200).springify().damping(10)}
        >
          {/* Use BlurView to blur the content under the footer */}
          <BlurView
            overlayColor=""
            style={{ ...StyleSheet.absoluteFillObject }}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
          <View style={{ width: "70%" }}>
            <CustomButton
              text="Order"
              onPress={() =>
                navigation.navigate("CheckOut", {
                  data: orderContent,
                  price: totalPrice,
                })
              }
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",

              backgroundColor: "#e6cafc",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#8F00FF" }}>Total Price:</Text>
            {totalPrice}₪
          </Text>
          {/* <View
            style={{
              position: "absolute",
              right: 10,
              bottom: 5,
              backgroundColor: "white",
            }}
          >
            <CustomButton
              text="Reset"
              type="Tertiary"
              onPress={() => setOrderContent([])}
            />
          </View> */}
        </Animated.View>
      )}
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
  footer: {
    backgroundColor: "transparent",
    width: "100%",

    alignSelf: "center",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 5,
    borderRadius: 0,
  },
});
export default RestaurantScreen;
