import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import defaultImage from "../assets/defaultProfile.jpg";
import { useRoute } from "@react-navigation/native";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import axios from "axios";
import BASE_URL from "../BaseUrl";
import { useUser } from "../Contexts/UserContext";
import PostCard from "../components/PostCard";
const OthersPosts = ({ navigation }) => {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const { otherId, userImage, username, major } = route.params;
  console.log(otherId, userImage, major);
  const { userId } = useUser();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const token = await getTokenFromKeychain();
        const response = await axios.get(
          `${BASE_URL}/post/student/${userId}/${otherId}`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the response data here, for example:
        const result = response.data;
        setPosts(result);
        setIsLoading(false);
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

    const unsubscribe = navigation.addListener("focus", () => {
      getPosts();
    });

    return unsubscribe;
  }, []);
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
        <ScrollView style={styles.root}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.imageCont}>
              <Image
                source={userImage !== "" ? { uri: userImage } : defaultImage}
                alt="Profile Image"
                style={styles.image}
                resizeMode="stretch"
              />
            </View>
          </View>
          <View style={styles.userDetails}>
            <Text
              style={{ fontSize: 20, color: "#8F00FF", fontWeight: "bold" }}
            >
              {username}
            </Text>
            <Text style={{ fontSize: 15, color: "#8F00FF", marginBottom: 20 }}>
              {major}
            </Text>
          </View>

          {/* Use map to render individual PostCard components */}
          {posts.map((item) => (
            <PostCard
              key={item.id}
              item={item}
              setPostsMain={setPosts}
              postsMain={posts}
            />
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1 },
  image: {
    width: 200,
    height: 200,
    borderRadius: 150,
    position: "absolute",
    bottom: -70,
    borderColor: "white",
    borderWidth: 2,
  },
  imageCont: {
    width: "130%",
    height: 200,
    backgroundColor: "#A100FF",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    alignItems: "center",
  },
  userDetails: { alignItems: "center", marginTop: 80 },
});
export default React.memo(OthersPosts);
OthersPosts.MyPostsScreen = "OthersPosts";
