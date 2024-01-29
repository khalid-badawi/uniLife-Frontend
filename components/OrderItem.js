import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import MenuRow from "./MenuRow";
import { getTokenFromKeychain } from "../globalFunc/Keychain";

import CustomHeader from "./CustomHeader";
import Rating from "./Rating";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";

const OrderItem = ({ item }) => {
  const dateString = item.createdAt;
  const dateObject = new Date(dateString);
  const [rating, setRating] = useState(item.rating);
  const { userId } = useUser();
  const [ratingNotes, setRatingNotes] = useState("");
  const handleRate = async () => {
    try {
      const token = await getTokenFromKeychain();
      const response = await axios.patch(
        `http://10.0.2.2:3000/api/v1/unilife/orders/${userId}/${item.orderId}`,
        JSON.stringify({ rating, rateDesc: ratingNotes }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //setErrorMsg("");
      console.log("gg");
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
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#FF5959"; // yellow
      case "RECEIVED":
        return "orange"; // green
      case "IN PROGRESS":
        return "#BBB900"; // blue
      case "READY":
        return "green"; // orange
      case "DELIVERED":
        return "#8F00FF"; // dark green
      case "CANCELLED":
        return "red"; // dark green
      default:
        return "#ffffff"; // default color
    }
  };

  // Now you can format the date using either method mentioned earlier
  // Using toLocaleString:
  const formattedDate = dateObject.toLocaleString();
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.mainTxt}>Ordered From: </Text>
          <Text style={styles.descTxt}>{item.restaurantName}</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.mainTxt}>Ordered ID: </Text>
          <Text style={styles.descTxt}>{item.orderId}</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.mainTxt}>Ordered On: </Text>
          <Text style={styles.descTxt}>{formattedDate}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            minHeight: 50,
            maxHeight: 150,
          }}
        >
          <Text style={styles.mainTxt}>Content: </Text>

          <FlatList
            style={{ maxHeight: 150 }}
            data={item.items}
            renderItem={({ item }) => (
              <MenuRow
                itemText={item.nameOfFood}
                quantity={item.Qauntity}
                color="black"
              />
            )}
            keyExtractor={(item, index) => item.nameOfFood}
            persistentScrollbar={true}
            scrollIndicatorInsets={{ color: "blue" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              ...styles.descTxt,
              color: getStatusColor(item.status),
              fontWeight: "bold",
            }}
          >
            <Text style={styles.mainTxt}>Status: </Text>
            {item.status}
          </Text>

          <Text
            style={{ ...styles.descTxt, color: "black", fontWeight: "bold" }}
          >
            {item.totalPrice}₪
          </Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          {item.status === "DELIVERED" && (
            <Rating
              rating={rating}
              setRating={setRating}
              setRatingNotes={setRatingNotes}
              ratingNotes={ratingNotes}
              onConfirm={handleRate}
              disabled={rating > 0}
            />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    marginTop: 5,
  },
  card: {
    backgroundColor: "white",
    minHeight: 200,
    maxHeight: 500,
    elevation: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  mainTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8F00FF",
  },
  descTxt: {
    fontSize: 16,
    fontWeight: "500",
  },
});
export default OrderItem;
