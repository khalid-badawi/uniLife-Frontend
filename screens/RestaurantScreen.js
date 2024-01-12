import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../Contexts/UserContext";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import BASE_URL from "../BaseUrl";
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
const RestaurantScreen = () => {
  const navigation = useNavigation();
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [orderContent, setOrderContent] = useState([]);
  const uniqueCategories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
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
    return items.filter((item) => item.category === selectedCategory);
  }
  const filteredMenu = filterItemsByCategory(menuItems, selectedCategory);
  const filteredMenuItems = filteredMenu.filter((item) =>
    item.nameOfFood.toLowerCase().includes(search.toLowerCase())
  );
  const totalPrice = orderContent.reduce(
    (acc, item) => acc + item.Quantity * item.price,
    0
  );
  const route = useRoute();
  const { restaurantId } = route.params;
  console.log(restaurantId);
  const { userId } = useUser();

  useEffect(() => {
    const getMenu = async () => {
      try {
        const token = await getTokenFromKeychain();
        const response = await axios.get(
          `${BASE_URL}/menu/${restaurantId}/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the response data here, for example:
        const result = response.data.data;
        setMenuItems(result);
        console.log(result);
        //setChat(response.data.data);
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
    getMenu();
  }, []);
  console.log(orderContent.length);
  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", width: "100%" }}>
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
          keyExtractor={(item) => item.foodId.toString()}
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
                  restaurantId,
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
