import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const SmallBtn = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} style={styles.icon} size={22} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 20,
    height: 20,
    backgroundColor: "#8F00FF",
    alignItems: "center",
  },
});
export default SmallBtn;
