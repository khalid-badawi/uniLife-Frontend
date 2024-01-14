import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import SmallBtn from "./SmallBtn";
import Icon from "react-native-vector-icons/AntDesign";
import BASE_URL from "../BaseUrl";
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
const ScheduleItem = ({
  lecture,
  lectures,
  setLectures,
  setRefreshTrigger,
}) => {
  const id = lecture.id;
  const navigation = useNavigation();
  const { userId } = useUser();
  const deleteLec = async () => {
    try {
      const token = await getTokenFromKeychain();
      const response = await axios.delete(
        `${BASE_URL}/lecture/${userId}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response data here, for example:
      const result = response;
      const updatedLectures = lectures.filter((item) => item.id !== id);
      setLectures(updatedLectures);
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
    <View style={styles.container}>
      <View style={styles.col1}>
        <Text style={styles.txt}>{lecture.startTime}</Text>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>-</Text>
        <Text style={styles.txt}>{lecture.endTime}</Text>
      </View>
      <View style={styles.col2}>
        <Text style={styles.mainTxt}>{lecture.Name}</Text>
        <Text style={styles.txt}>{lecture.classNumber}</Text>
      </View>
      <View
        style={{ width: "10%", justifyContent: "center", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditSchedule", {
              setRefreshTrigger,
              subject: lecture.Name,
              classNum: lecture.classNumber,
              time1: lecture.startTime,
              time2: lecture.endTime,
              days: lecture.day,
              id: id,
            })
          }
        >
          <Icon
            name="edit"
            style={{ ...styles.icon, marginBottom: 10 }}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteLec}>
          <Icon name="delete" style={styles.icon} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,

    paddingVertical: 8,
    marginBottom: 5,
    marginTop: 5,
    shadowColor: "#000",
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 9,
    shadowRadius: 6,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
  },
  icon: {
    color: "#8F00FF",
  },
  bottomLine: {
    height: 1,
    backgroundColor: "gray",
  },
  content: {},
  col1: {
    width: "25%",

    marginHorizontal: 10,
  },
  col2: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    borderLeftColor: "#8F00FF",
    borderLeftWidth: 2,
    width: "50%",
  },
  mainTxt: {
    fontSize: 18,
    color: "#8F00FF",
    fontWeight: "bold",
  },
  txt: {
    alignSelf: "center",
    fontSize: 18,
  },
});
export default ScheduleItem;
