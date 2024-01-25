// PostsMainScreen.js
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
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import BASE_URL from "../BaseUrl";
import { useUser } from "../Contexts/UserContext";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import axios from "axios";
import CustomHeader from "../navigation/CustomHeader";
import { useSearch } from "../Contexts/SearchContext";
import CustomButton from "../components/CustomButton";
const MyPostsScreen = ({ navigation }) => {
  const { searchQuery, setSearchQuery } = useSearch();

  console.log(searchQuery);
  const [posts, setPosts] = useState("");
  const [search, setSearch] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(true);
  const buttons = ["Posted by me", "Reserved by me"];
  const [selectedButton, setSelectedButton] = useState(buttons[0]);
  console.log("Hi", searchQuery);
  const handleCategoryClick = (btn) => {
    setSelectedButton(btn);
  };
  const { userId } = useUser();
  const getPosts = async () => {
    try {
      setIsLoading(true);
      const token = await getTokenFromKeychain();
      const response = await axios.get(`${BASE_URL}/post/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response data here, for example:
      const result = response.data;
      console.log(result);
      setPosts(result);
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
  const getReservedPosts = async () => {
    try {
      setIsLoading(true);
      const token = await getTokenFromKeychain();
      const response = await axios.get(`${BASE_URL}/reservedpost/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response data here, for example:
      const result = response.data;
      setPosts(result);
      console.log("Hello", result);
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
    let done = false;

    const unsubscribe = navigation.addListener("focus", () => {
      console.log("gg1");
      if (selectedButton === buttons[0]) {
        getPosts();
      } else if (selectedButton === buttons[1]) {
        getReservedPosts();
      }
      done = true;
    });
    if (!done) {
      console.log("gg2");
      if (selectedButton === buttons[0]) {
        getPosts();
      } else if (selectedButton === buttons[1]) {
        getReservedPosts();
      }
    }

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
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostCard
                item={item}
                type={selectedButton === buttons[0] ? "mine" : "reserved"}
                setPosts={setPosts}
                posts={posts}
                selectedButton={selectedButton}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          {/* Use the FilterModal component */}
        </View>
      )}
    </>
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

export default React.memo(MyPostsScreen);
MyPostsScreen.MyPostsScreen = "MyPostsScreen";
