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

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const buttons = ["Orders", "Exchange"];
  const [selectedButton, setSelectedButton] = useState(buttons[0]);

  const handleCategoryClick = (btn) => {
    setSelectedButton(btn);
  };

  const { userId } = useUser();

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const token = await getTokenFromKeychain();
      const response = await axios.get(`${BASE_URL}/orders/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data;
      setNotifications(result);
      setIsLoading(false);
    } catch (error) {
      // Handle errors
    }
  };

  const getExchangeNotifications = async () => {
    try {
      setIsLoading(true);
      const token = await getTokenFromKeychain();
      const response = await axios.get(`${BASE_URL}/exchange/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data;
      setNotifications(result);
      setIsLoading(false);
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (selectedButton === buttons[0]) {
        getOrders();
      } else if (selectedButton === buttons[1]) {
        getExchangeNotifications();
      }
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
          <CustomHeader title="Notifications" />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {buttons.map((category) => (
              <CustomButton
                key={category}
                text={category}
                type={category === selectedButton ? "Selected" : "NotSelected"}
                onPress={() => handleCategoryClick(category)}
              />
            ))}
          </View>
          <View style={{ height: 10, backgroundColor: "#E3E3E3" }}></View>
          {/* <FlatList
            data={notifications}
            renderItem={({ item }) => (
              <NotificationCard
                item={item}
                type={selectedButton === buttons[0] ? "order" : "exchange"}
                setNotifications={setNotifications}
                notifications={notifications}
                selectedButton={selectedButton}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          /> */}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "white" },
});

export default NotificationScreen;
