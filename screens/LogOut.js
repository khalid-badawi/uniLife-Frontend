import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Keychain from "react-native-keychain";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
import BASE_URL from "../BaseUrl";
import axios from "axios";
const LogOut = () => {
  const { userId } = useUser();
  const navigation = useNavigation();
  async function deleteToken() {
    try {
      const token = await getTokenFromKeychain();
      await Keychain.resetGenericPassword();
      console.log("Token deleted successfully");
    } catch (error) {
      console.error("Error deleting token", error);
    }
  }
  const handleLogout = async () => {
    try {
      await removeFCMTokenFromDatabase();
      await deleteToken();
      const tok = await getTokenFromKeychain();
      console.log("TOKENNN", tok);
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const removeFCMTokenFromDatabase = async () => {
    try {
      const token = await getTokenFromKeychain();
      const response = await axios.delete(`${BASE_URL}/logout/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response data here, for example:
      console.log("FCM Token removed from the database");
      //setChat(response.data.data);
    } catch (error) {
      console.error("Error removing FCM token from the database:", error);
    }
  };
  useEffect(() => {
    // Perform logout actions when the component mounts
    handleLogout();
  }, []);
  return (
    <View>
      <Text>LogOut</Text>
    </View>
  );
};

export default LogOut;
