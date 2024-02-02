import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomButton from "./CustomButton";
import { Picker } from "@react-native-picker/picker";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import BASE_URL from "../BaseUrl";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";
const majors = ["All", "Relevant"];
const Catigory = ["All", "Books", "Equipments"];
const FilterModal = ({
  visible,
  closeModal,
  major,
  handleMajorChange,
  catigory,
  setCatigory,
  getPosts,
}) => {
  const onPress = () => {
    closeModal();
    getPosts();
  };
  const [Catigories, setCatigories] = useState(["All"]);
  const { userId } = useUser();
  useEffect(() => {
    const getFaculties = async () => {
      try {
        console.log("hi", userId);

        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/category/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the response data here, for example:
        const result = response.data;
        console.log(result);
        let newCategories = result.map((item) => item.name);
        newCategories = ["All", ...newCategories];
        setCatigories(newCategories);

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
            "Something Wrong23",
            "Something went wrong, try again please",
            [{ text: "OK" }]
          );
        }
      }
    };
    getFaculties();
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.txt}>Get Posts: </Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={major}
                onValueChange={(itemValue, itemIndex) =>
                  handleMajorChange(itemValue)
                }
              >
                {majors.map((major, index) => (
                  <Picker.Item key={index} label={major} value={major} />
                ))}
              </Picker>
            </View>
          </View>
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.txt}>Catigory{":   "}</Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={catigory}
                onValueChange={(itemValue, itemIndex) => setCatigory(itemValue)}
              >
                {Catigories.map((catigory, index) => (
                  <Picker.Item key={index} label={catigory} value={catigory} />
                ))}
              </Picker>
            </View>
          </View>
          {/* Your filter options and content go here */}
          <CustomButton text="Filter" onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    width: "90%", // Adjust the width as needed
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  txt: {
    fontSize: 16,
  },
  pickerCont: {
    flex: 1,
    borderColor: "#8F00FF",
    borderWidth: 1,
    borderRadius: 25,
  },
});

export default FilterModal;
