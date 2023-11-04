import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
const CustomButton = ({ onPress, text, color, type = "Primary" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styles[`container${type}`]]}
    >
      <Text style={[styles.text, styles[`text${type}`]]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 5,
  },
  containerPrimary: {
    backgroundColor: "#8F00FF",
    padding: 15,
  },
  containerTertiary: {
    backgroundColor: "transparent",
    padding: 5,
  },

  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  textTertiary: {
    color: "#8F00FF",
  },
});

export default CustomButton;
