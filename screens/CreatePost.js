import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import TextArea from "../components/TextArea";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import PickImage from "../components/PickImage";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import { useUser } from "../Contexts/UserContext";
const RAPIDAPI_HOST = "investing-cryptocurrency-markets.p.rapidapi.com";
const RAPIDAPI_KEY = "3bd39bcb8dmshb5db9a8e916f20dp198b41jsn95ca2c49a7d2";
const majors = [
  "Targeted Majors",
  "All",
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biology",
  "Physics",
  "Mathematics",
  "Psychology",
  "Economics",
  "Political Science",
  "History",
];
const Catigories = ["Select Catigory", "Books", "Equipments"];
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
  const [image, setImage] = useState(null);
  const { userId } = useUser();

  const handleMajorChange = (major) => {
    console.log(major);
    if (major === "All") {
      setRelatedMajors(["All"]);
    } else if (
      !relatedMajors.includes(major) &&
      !relatedMajors.includes("All")
    ) {
      setRelatedMajors([...relatedMajors, major]);
    }

    setSelectedMajor("");
  };

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
          `http://10.0.2.2:3000/api/v1/unilife/post/${userId}`,
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
      <CustomHeader
        text="Create Post"
        BtnText="Post"
        handleButtonPress={handlePostPress}
      />
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
          {Catigories.map((catigory, index) => (
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

      <View style={{ marginLeft: 10 }}>
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

export default CreatePost;
