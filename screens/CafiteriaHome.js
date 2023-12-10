import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import RestCard from "../components/RestCard";
import PopularMeal from "../components/PopularMeal";
import { FlatList } from "react-native";
import { ScrollView, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import { useUser } from "../Contexts/UserContext";
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

const getTokenFromKeychain = async () => {
  try {
    // Retrieve the token from the keychain
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      const token = credentials.password;
      console.log("Token retrieved successfully:", token);
      return token;
    } else {
      console.log("No token found in the keychain");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

const CafiteriaHome = () => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const { userId } = useUser();
  const BASE_URL = "http://10.0.2.2:3000/api/v1/unilife";

  const visitRestaurant = (restaurantId) => {
    console.log(restaurantId);
    navigation.navigate("RestaurantScreen", { restaurantId });
  };

  useEffect(() => {
    const getRseturnats = async () => {
      try {
        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/restaurants/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the response data here, for example:
        setRestaurants(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        if (error.response) {
          Alert.alert("Error", error.response.data.message);
        } else if (error.request) {
          Alert.alert(
            "Network Error",
            "There was a problem with the network. Please check your internet connection and try again.",
            [{ text: "OK" }]
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          Alert.alert(
            "Something Wrong",
            "Something went wrong, try again please",
            [{ text: "OK" }]
          );
        }
      }
    };

    getRseturnats();
  }, []);

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", width: "100%" }}>
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
          height: "100%",
        }}
      >
        <View style={{ height: "99%" }}>
          <FlatList
            data={restaurants}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <RestCard
                {...item}
                visitRest={() => {
                  visitRestaurant(item.id);
                }}
              />
            )}
            contentContainerStyle={{ marginBottom: 10 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 10,
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
