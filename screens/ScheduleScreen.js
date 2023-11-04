import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
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

const lectureArray = [
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

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const moveNextDay = () => {
    setSelectedDayIndex((prevIndex) => (prevIndex === 5 ? 0 : prevIndex + 1));
  };

  const movePreviousDay = () => {
    setSelectedDayIndex((prevIndex) =>
      prevIndex === 0 ? daysOfWeek.length - 1 : prevIndex - 1
    );
  };

  const scheduleData = lectureArray;

  const renderItem = ({ item }) => <ScheduleItem lecture={item} />;

  const { height, width } = useWindowDimensions();
  return (
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
          <Text style={styles.dayTxt}>{daysOfWeek[selectedDayIndex]}</Text>
        </View>

        <View style={styles.arrow}>
          <TouchableOpacity onPress={moveNextDay}>
            <Icon name="caretright" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.list, maxHeight: height * 0.6 }}>
        <FlatList
          data={scheduleData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          hidd
        />
      </View>
      <View style={styles.footer}>
        <CustomButton text="Add a Lecture" type="Tertiary" color="#8F00FF" />
      </View>
    </Animated.View>
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

export default ScheduleScreen;
