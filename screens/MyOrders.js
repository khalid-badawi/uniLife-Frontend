import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import OrderItem from "../components/OrderItem";
import CustomHeader from "../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";
const MyOrders = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const uniqueCategories = ["Date", "Restaurant"];
  const { userId } = useUser();
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearch("");
  };
  const BASE_URL = "http://10.0.2.2:3000/api/v1/unilife";
  const [selectedCategory, setSelectedCategory] = useState(uniqueCategories[0]);
  useEffect(() => {
    const getMenu = async () => {
      try {
        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/orders/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the response data here, for example:
        const result = response.data.retrieveData;
        setOrders(result);
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
  return (
    <View style={styles.root}>
      <View style={styles.searchBarCont}>
        <Ionicons name="search" style={styles.icon} size={20} />

        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
      </View>
      <View
        style={{
          marginLeft: 15,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>SearchBy:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
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
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderItem item={item} />}
        keyExtractor={(item) => item.orderId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarCont: {
    height: 50,
    borderRadius: 10,

    padding: 8,
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 20,
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
export default MyOrders;
