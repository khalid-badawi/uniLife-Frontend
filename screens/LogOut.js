import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Keychain from "react-native-keychain";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
import BASE_URL from "../BaseUrl";
import axios from "axios";

const LogOut = () => {
  const { userId, setUserId } = useUser();
  const navigation = useNavigation();
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  async function deleteToken() {
    try {
      await Keychain.resetGenericPassword();
      console.log("Token deleted successfully");
    } catch (error) {
      console.error("Error deleting token", error);
    }
  }

  const removeFCMTokenFromDatabase = async () => {
    try {
      const token = await getTokenFromKeychain();
      await axios.delete(`${BASE_URL}/logout/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("FCM Token removed from the database");
    } catch (error) {
      console.error("Error removing FCM token from the database:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await removeFCMTokenFromDatabase();
      await deleteToken();
      setUserId(null); // Reset user ID in context
      setIsLoggingOut(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  if (isLoggingOut) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#8F00FF" />
        <Text>Logging out...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Logged Out</Text>
    </View>
  );
};

export default LogOut;
