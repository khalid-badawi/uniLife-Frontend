import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
const CustomHeader = ({ onPress, text }) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="back" style={styles.icon} size={25} />
      </TouchableOpacity>
      <Text style={styles.txt}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    padding: 15,
    elevation: 5,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
    fontWeight: "bold",
  },
  txt: {
    fontSize: 18,
    fontWeight: "500",
  },
});
export default CustomHeader;
