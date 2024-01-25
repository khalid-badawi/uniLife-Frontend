import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import TextArea from "../components/TextArea";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../components/CustomButton";
import PickImage from "../components/PickImage";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import { useUser } from "../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../BaseUrl";
import CustomHeader from "../navigation/CustomHeader";
const RAPIDAPI_HOST = "investing-cryptocurrency-markets.p.rapidapi.com";
const RAPIDAPI_KEY = "3bd39bcb8dmshb5db9a8e916f20dp198b41jsn95ca2c49a7d2";
const getTokenFromKeychain = async () => {
  try {
    // Retrieve the token from the keychain
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      const token = credentials.password;
      console.log("Token retrieved successfully:", token);
      return token;
    } else {
      console.log("No token found in the keychain");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedCatigory, setSelectedCatigory] = useState("");
  const [relatedMajors, setRelatedMajors] = useState([]);
  const [majors, setMajors] = useState([]);
  const [catigories, setCatigories] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useUser();
  const navigation = useNavigation();
  console.log(selectedCatigory);
  useEffect(() => {
    const getMenu = async () => {
      try {
        setIsLoading(true);
        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/major/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Hellooo");
        // Handle the response data here, for example:
        const result = response.data;

        console.log(result);
        const mappedArray = result.map((item) => item.name);
        setMajors(["Targeted Majors", "All", ...mappedArray]);
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
    getMenu();
  }, []);
  useEffect(() => {
    const getCatigory = async () => {
      try {
        setIsLoading(true);
        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/catigory/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Hellooo");
        // Handle the response data here, for example:
        const result = response.data;

        console.log(result);
        const mappedArray = result.map((item) => item.name);
        setCatigories(["Select Category", ...mappedArray]);

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
    getCatigory();
  }, []);

  const handleMajorChange = (major) => {
    console.log(major);
    if (major === "Targeted Majors") {
      return;
    }
    if (major === "All") {
      setRelatedMajors(["All"]);
    } else if (!relatedMajors.includes(major)) {
      const filtered = relatedMajors.filter((item) => item !== "All");
      setRelatedMajors([...filtered, major]);
    }

    setSelectedMajor("");
  };
  console.log(relatedMajors);
  const handlePostPress = async () => {
    // Validate postText, relatedMajors, and image
    if (
      !postText.trim() ||
      relatedMajors.length === 0 ||
      !image ||
      !selectedCatigory
    ) {
      Alert.alert("Error", "Please fill in all fields before posting.");
    } else {
      try {
        const token = await getTokenFromKeychain();

        const formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({
            description: postText,
            catigory: selectedCatigory,
            majors: relatedMajors,
          })
        );
        formData.append("image", {
          uri: image.uri, // Assuming 'image' is an object returned by ImagePicker
          type: "image/jpeg", // Adjust the type based on your image type
          name: "image.jpeg",
        });
        console.log(formData);

        const response = await axios.post(
          `${BASE_URL}/post/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Post created:", response.data);
      } catch (error) {
        if (error.response) {
          Alert("Error", error.response.data.message);
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
    }
  };

  return (
    <View style={styles.root}>
      <CustomHeader title="Create Post">
        <TouchableOpacity
          style={{ marginTop: 2, marginRight: 5 }}
          onPress={handlePostPress}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
            Post
          </Text>
        </TouchableOpacity>
      </CustomHeader>
      <View style={{ marginTop: 10 }}>
        <TextArea
          text={postText}
          setText={setPostText}
          numLines={10}
          placeholder="Descripe your item..."
        />
      </View>
      <View style={{ ...styles.pickerCont, marginTop: 5 }}>
        <Picker
          selectedValue={selectedCatigory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCatigory(itemValue)
          }
        >
          {catigories.map((catigory, index) => (
            <Picker.Item
              key={index}
              label={catigory}
              value={catigory}
              enabled={index !== 0}
            />
          ))}
        </Picker>
      </View>
      <View style={{ ...styles.pickerCont, marginTop: 5 }}>
        <Picker
          selectedValue={selectedMajor}
          onValueChange={(itemValue, itemIndex) => handleMajorChange(itemValue)}
        >
          {majors.map((major, index) => (
            <Picker.Item
              key={index}
              label={major}
              value={major}
              enabled={index !== 0}
            />
          ))}
        </Picker>
      </View>

      <View style={{ marginLeft: 10, display: "flex", flexDirection: "row" }}>
        {relatedMajors.length !== 0 && (
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => setRelatedMajors([])}
          >
            <Text style={{ color: "#8F00FF", fontSize: 16 }}>clear all</Text>
          </TouchableOpacity>
        )}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={true}
          data={relatedMajors}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CustomButton text={item} type="NotSelected" disabled={true} />
          )}
          contentContainerStyle={{ marginTop: 0 }}
        />
      </View>
      <PickImage image={image} setImage={setImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
  },
  pickerCont: {
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 0.2,
    overflow: "hidden",
    marginHorizontal: 5,
  },
});

export default React.memo(CreatePost);
CreatePost.displayName = "CreatePost";
