import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import CustomHeader from "../components/CustomHeader";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import BASE_URL from "../BaseUrl";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";
import { FlatList } from "react-native-gesture-handler";

const MyChats = () => {
  const { userId } = useUser();
  const [myChats, setMyChats] = useState();
  useEffect(() => {
    const getChats = async () => {
      try {
        console.log("hi", userId);

        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/message/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the response data here, for example:
        const result = response.data;
        setMyChats(result);
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
    getChats();
  }, []);
  return (
    <View style={styles.root}>
      <FlatList
        data={myChats?.messages} // Use myChats?.messages instead of myChats
        renderItem={({ item }) => <ChatCard item={item} />}
        keyExtractor={(item) => item.otherPersonId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 10,
  },
});
export default MyChats;
