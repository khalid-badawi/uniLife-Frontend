// PostsMainScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
import BASE_URL from "../BaseUrl";
const PostsMainScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [catigory, setCatigory] = useState("All");
  const [major, setMajor] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [mounted, setMounted] = useState(false);

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const { userId } = useUser();

  const search = async () => {
    if (mounted) {
      try {
        const token = await getTokenFromKeychain();

        const response = await axios.get(`${BASE_URL}/post/search/${userId}`, {
          params: { description: searchText }, // Send search text as a query parameter
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = response.data.data;
        setPosts(result);
        console.log(result);
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
    } else {
      setMounted(true);
    }
  };
  useEffect(() => {
    search();
  }, [searchText]);
  const getPosts = async () => {
    try {
      const token = await getTokenFromKeychain();
      const response = await axios.get(
        `${BASE_URL}/post/all/${userId}/${currentPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response data here, for example:
      const result = response.data.data;
      setPosts((prev) => [...prev, ...result]);
      console.log(result);
      setCurrentPage((current) => current + 1);

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
    getPosts();
  }, []);

  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.filter} onPress={openFilterModal}>
        <AntDesign name="filter" size={22} style={styles.icon} />
        <Text style={{ fontSize: 16, color: "#8F00FF", fontWeight: "500" }}>
          Filter Posts
        </Text>
      </TouchableOpacity>
      <View
        style={{ height: 10, backgroundColor: "#E3E3E3", marginTop: 10 }}
      ></View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

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
