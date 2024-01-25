// NotificationScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native";
// import NotificationCard from "../components/NotificationCard"; // Assuming you have a NotificationCard component
import CustomButton from "../components/CustomButton";
import BASE_URL from "../BaseUrl";
import { useUser } from "../Contexts/UserContext";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import axios from "axios";
import CustomHeader from "../navigation/CustomHeader";
import NotificationCard from "../components/NotificationCard";
import { useDrawer } from "../Contexts/openContext";
import { useDrawerStatus } from "@react-navigation/drawer";

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const buttons = ["Orders", "Exchange"];
  const [selectedButton, setSelectedButton] = useState(buttons[0]);

  const handleCategoryClick = (btn) => {
    setSelectedButton(btn);
  };

  const { userId } = useUser();

  const getNotifications = async () => {
    try {
      console.log("NOOOOOOOOO");
      setIsLoading(true);
      const token = await getTokenFromKeychain();
      const response = await axios.get(`${BASE_URL}/notification/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Hellooo");
      // Handle the response data here, for example:
      const result = response.data;
      setNotifications(result);
      console.log(result);
      setIsLoading(false);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotifications();
    });

    return unsubscribe;
  }, [selectedButton]);

  return (
    <>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color="#8F00FF" />
        </View>
      )}
      {!isLoading && (
        <View style={styles.root}>
          <FlatList
            data={notifications}
            renderItem={({ item }) => <NotificationCard item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "white" },
});

export default React.memo(NotificationScreen);
NotificationScreen.MyPostsScreen = "NotificationScreen";
