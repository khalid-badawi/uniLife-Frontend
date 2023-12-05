import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
const CustomButton = ({
  onPress,
  text,
  color,
  type = "Primary",
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, styles[`container${type}`]]}
    >
      <Text style={[styles.text, styles[`text${type}`]]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    marginVertical: 5,
  },
  containerPrimary: {
    backgroundColor: "#8F00FF",
    padding: 15,
    width: "100%",
    borderRadius: 30,
  },
  containerTertiary: {
    backgroundColor: "transparent",
    padding: 5,
    width: "100%",
  },

  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  textTertiary: {
    color: "#8F00FF",
  },
  textNotSelected: {
    color: "#8F00FF",
    fontSize: 15,
  },
  textSelected: {
    fontSize: 15,
  },
  containerSelected: {
    color: "white",
    backgroundColor: "#8F00F0",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,

    marginHorizontal: 5,
  },
  containerNotSelected: {
    backgroundColor: "#e6cafc",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});

export default CustomButton;
