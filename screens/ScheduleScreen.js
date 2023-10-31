import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";
import Logo from "../assets/schedule.png";
import ScheduleItem from "../components/ScheduleItem";

const ScheduleScreen = () => {
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Image
          source={Logo}
          style={{ ...styles.logo, height: height * 0.2 }} // Fixed style object
          resizeMode="contain"
        />
      </View>
      <ScheduleItem />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    borderRadius: 3,
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
  },
  text: {
    color: "#a163f5",
    fontWeight: "bold",
    fontSize: 35,
    alignSelf: "center",
  },
});

export default ScheduleScreen;
