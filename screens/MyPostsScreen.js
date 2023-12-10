// PostsMainScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import CustomHeader from "../components/CustomHeader";

const MyPostsScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.root}>
      <CustomHeader text="My Posts" />

      <View style={{ height: 10, backgroundColor: "#E3E3E3" }}></View>
      <ScrollView>
        <PostCard />
        <PostCard />
      </ScrollView>

      {/* Use the FilterModal component */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "white", paddingTop: 10 },
  filter: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  icon: {
    color: "#8F00FF",
  },
});

export default MyPostsScreen;
