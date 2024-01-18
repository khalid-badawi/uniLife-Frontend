// PostsMainScreen.js
import React, { useState, useEffect, useReducer } from "react";
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
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
import BASE_URL from "../BaseUrl";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useSearch } from "../Contexts/SearchContext";
import { isLoading } from "expo-font";
const PostsMainScreen = () => {
  const [searchText, setSearchText] = useState("");
  const { searchQuery } = useSearch();
  const [isLoading1, setIsLoading1] = useState(true);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [catigory, setCatigory] = useState("All");
  const [major, setMajor] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [abortController, setAbortController] = useState(new AbortController());

  const [posts, setPosts] = useState([]);
  const [isButtonShown, setIsButtonShown] = useState(false);

  const [forceUpdate, setForceUpdate] = useReducer((x) => x + 1, 0);
  console.log(searchQuery);

  const handleForceUpdate = () => {
    // Update the forceUpdate state to force a re-render
    setPosts([]);
    setCurrentPage(1);
    setForceUpdate((prev) => prev + 1);
  };
  const navigation = useNavigation();

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const { userId } = useUser();

  const getPosts = async () => {
    try {
      setCurrentPage(1);
      const newAbortController = new AbortController();
      setAbortController(newAbortController);

      const token = await getTokenFromKeychain();
      const response = await axios.get(`${BASE_URL}/post/all/${userId}/${1}`, {
        signal: newAbortController.signal,
        params: {
          description: searchQuery,
          myMajor: major,
          myCatigory: catigory,
        }, // Send search text as a query parameter
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response data here, for example:
      console.log("Hello");
      const result = response.data;

      setPosts(result);

      console.log(result);
      setCurrentPage((current) => current + 1);

      setIsLoading1(false);
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
    return () => {
      abortController.abort();
    };
  }, [forceUpdate, searchQuery]);
  const getMorePosts = async () => {
    try {
      setIsButtonShown(false);
      const token = await getTokenFromKeychain();
      const response = await axios.get(
        `${BASE_URL}/post/all/${userId}/${currentPage}`,
        {
          params: {
            description: searchQuery,
            myMajor: major,
            myCatigory: catigory,
          }, // Send search text as a query parameter
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response data here, for example:
      console.log("Hello2");
      const result = response.data;

      setPosts((prev) => [...prev, ...result]);

      console.log(result);
      setCurrentPage((current) => current + 1);

      setIsLoading1(false);
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
  return (
    <>
      {isLoading1 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color="#8F00FF" />
        </View>
      )}
      {!isLoading1 && (
        <View style={styles.root}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.filter} onPress={openFilterModal}>
              <AntDesign name="filter" size={23} style={styles.icon} />
              <Text
                style={{ fontSize: 17, color: "#8F00FF", fontWeight: "bold" }}
              >
                Filter Posts
              </Text>
            </TouchableOpacity>
            <View style={{ marginRight: 4 }}>
              <CustomButton
                text="Create Post"
                type="Tertiary"
                onPress={() => navigation.navigate("CreatePost")}
              />
            </View>
          </View>
          <View
            style={{ height: 10, backgroundColor: "#E3E3E3", marginTop: 10 }}
          ></View>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostCard
                item={item}
                forceUpdate={handleForceUpdate}
                setCurrentPage={setCurrentPage}
                setPostsMain={setPosts}
                postsMain={posts}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => setIsButtonShown(true)}
            onEndReachedThreshold={0.1}
          />
          {isButtonShown && (
            <CustomButton
              text="Show More"
              type="Tertiary"
              onPress={getMorePosts}
            />
          )}

          {/* Use the FilterModal component */}

          <FilterModal
            visible={isFilterModalVisible}
            closeModal={closeFilterModal}
            major={major}
            handleMajorChange={setMajor}
            catigory={catigory}
            setCatigory={setCatigory}
            getPosts={getPosts}
          />
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

export default PostsMainScreen;
