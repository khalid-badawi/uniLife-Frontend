// PostsMainScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";

const PostsMainScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [catigory, setCatigory] = useState("All");
  const [major, setMajor] = useState("All");
  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "80%" }}>
          <SearchBar placeholder="Search..." setSearchText={setSearchText} />
        </View>
        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 16, color: "#8F00FF", fontWeight: "500" }}>
            My Posts
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.filter} onPress={openFilterModal}>
        <AntDesign name="filter" size={22} style={styles.icon} />
        <Text style={{ fontSize: 16, color: "#8F00FF", fontWeight: "500" }}>
          Filter Posts
        </Text>
      </TouchableOpacity>
      <View
        style={{ height: 10, backgroundColor: "#E3E3E3", marginTop: 10 }}
      ></View>
      <ScrollView>
        <PostCard />
        <PostCard />
      </ScrollView>

      {/* Use the FilterModal component */}
      <FilterModal
        visible={isFilterModalVisible}
        closeModal={closeFilterModal}
        major={major}
        handleMajorChange={setMajor}
        catigory={catigory}
        setCatigory={setCatigory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "white" },
  filter: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  icon: {
    color: "#8F00FF",
  },
});

export default PostsMainScreen;
