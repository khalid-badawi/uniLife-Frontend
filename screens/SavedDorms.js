import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import DormitoryCard from "../components/DormitoryCard";
import DormitoryModal from "../components/DormitoryModal";
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import BASE_URL from "../BaseUrl";
import { useUser } from "../Contexts/UserContext";
import { useRoute } from "@react-navigation/native";
const SavedDorms = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { userId } = useUser();

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const getDorms = async () => {
    try {
      setIsLoading(true);
      const token = await getTokenFromKeychain();
      const response = await axios.get(`${BASE_URL}/domitorysave/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Hellooo");
      // Handle the response data here, for example:
      const result = response.data;
      setPosts(result);
      console.log(result);
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
    const unsubscribe = navigation.addListener("focus", () => {
      getDorms();
    });

    return unsubscribe;
  }, [navigation]);

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
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <DormitoryCard
                item={item}
                posts={posts}
                setPosts={setPosts}
                type="saved"
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1 },
  filter: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  icon: { color: "#8F00FF" },
});
export default React.memo(SavedDorms);
SavedDorms.MyPostsScreen = "SavedDorms";
