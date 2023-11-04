import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import SmallBtn from "./SmallBtn";
import Icon from "react-native-vector-icons/AntDesign";
const ScheduleItem = ({ lecture }) => {
  return (
    <View style={styles.container}>
      <View style={styles.col1}>
        <Text style={styles.txt}>{lecture.startTime}</Text>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>-</Text>
        <Text style={styles.txt}>{lecture.endTime}</Text>
      </View>
      <View style={styles.col2}>
        <Text style={styles.mainTxt}>{lecture.subject}</Text>
        <Text style={styles.txt}>{lecture.location}</Text>
      </View>
      <View
        style={{ width: "10%", justifyContent: "center", alignItems: "center" }}
      >
        <TouchableOpacity>
          <Icon
            name="edit"
            style={{ ...styles.icon, marginBottom: 5 }}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="delete" style={styles.icon} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,

    paddingVertical: 5,
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
