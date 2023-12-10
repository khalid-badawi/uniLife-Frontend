import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ChatCard from "../components/ChatCard";
import CustomHeader from "../components/CustomHeader";

const MyChats = () => {
  return (
    <View style={styles.root}>
      <ChatCard />
      <ChatCard />
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
