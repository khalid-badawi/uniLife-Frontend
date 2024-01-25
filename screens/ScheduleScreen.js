import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useReducer } from "react";
import Logo from "../assets/schedule.png";
import ScheduleItem from "../components/ScheduleItem";
import DaysSelection from "../components/DaysSelection";
import { CheckBox } from "react-native-elements";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/AntDesign";
import Animated, {
  BounceInRight,
  BounceInUp,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { Navigation } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import BASE_URL from "../BaseUrl";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";
const lectureArray = [
  {
    subject: "Mathematics",
    lectureDay: "Monday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "19G2070",
  },
  {
    subject: "History",
    lectureDay: "Wednesday",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    location: "Room B204",
  },
  {
    subject: "Computer Science",
    lectureDay: "Friday",
    startTime: "9:30 AM",
    endTime: "11:00 AM",
    location: "19G2070",
  },
  {
    subject: "Mathematics",
    lectureDay: "Monday",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "19G2070",
    days: "Sunday,Monday",
  },
  {
    subject: "History",
    lectureDay: "Wednesday",
    startTime: "2:00 PM",
    endTime: "3:30 PM",
    location: "Room B204",
  },
  {
    subject: "Computer Science",
    lectureDay: "Friday",
    startTime: "9:30 AM",
    endTime: "11:00 AM",
    location: "19G2070",
  },
];

const ScheduleScreen = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday",
  ];
  const navigation = useNavigation();
  const [dayIndex, setdayIndex] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const filterLecturesByDay = (lectures, selectedDay) => {
    return lectures.filter((lecture) => lecture.day.includes(selectedDay));
  };
  const selectedDay = daysOfWeek[dayIndex]; // Assuming daysOfWeek is an array with the names of days
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isLoading, setIsLoading] = useState(true);
  const filteredLectures = filterLecturesByDay(lectures, selectedDay);
  const { userId } = useUser();
  useEffect(() => {
    const getLectures = async () => {
      try {
        setIsLoading(true);
        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/lecture/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the response data here, for example:
        const result = response.data;
        setLectures(result);
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
      getLectures();
    });

    return unsubscribe;
  }, [refreshTrigger]);
  const moveNextDay = () => {
    setdayIndex((prevIndex) => (prevIndex === 5 ? 0 : prevIndex + 1));
  };

  const movePreviousDay = () => {
    setdayIndex((prevIndex) =>
      prevIndex === 0 ? daysOfWeek.length - 1 : prevIndex - 1
    );
  };

  const scheduleData = lectureArray;

  const renderItem = ({ item }) => (
    <ScheduleItem
      lecture={item}
      lectures={lectures}
      setLectures={setLectures}
      setRefreshTrigger={setRefreshTrigger}
    />
  );

  const { height, width } = useWindowDimensions();
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
        <Animated.View
          style={styles.root}
          entering={BounceInRight.delay(100).duration(500)}
        >
          <View style={{ ...styles.header, height: 0.15 * height }}>
            <View style={styles.arrow}>
              <TouchableOpacity onPress={movePreviousDay}>
                <Icon name="caretleft" size={22} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.dayTxt}>{daysOfWeek[dayIndex]}</Text>
            </View>

            <View style={styles.arrow}>
              <TouchableOpacity onPress={moveNextDay}>
                <Icon name="caretright" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ ...styles.list, height: height * 0.6 }}>
            <FlatList
              data={filteredLectures}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.footer}>
            <CustomButton
              text="Add a Lecture"
              type="Tertiary"
              color="#8F00FF"
              onPress={() =>
                navigation.navigate("Add Schedule", { setRefreshTrigger })
              }
            />
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    marginTop: 5,
  },
  header: {
    marginTop: 5,
    shadowColor: "#000",
    backgroundColor: "#8F00FF",
    marginHorizontal: 8,
    marginBottom: 10,
    borderRadius: 25,
    elevation: 9,
    shadowRadius: 6,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
    flexDirection: "row",
  },

  arrow: {
    width: "25%",
    alignItems: "center",

    justifyContent: "center",
  },
  text: {
    color: "#a163f5",
    fontWeight: "bold",
    fontSize: 35,
    alignSelf: "center",
  },
  dayTxt: {
    fontSize: 25,
    color: "white",
  },
  footer: {
    backgroundColor: "white",
    flex: 1,
    borderColor: "#8F00FF",
    borderTopWidth: 0.5,
    borderBottomWidth: 0,
    borderRadius: 5,
  },
  list: {},
});

export default React.memo(ScheduleScreen);
ScheduleScreen.MyPostsScreen = "ScheduleScreen";
