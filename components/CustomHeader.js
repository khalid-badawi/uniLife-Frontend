import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";
const CustomHeader = ({ onPress, text, type, handleButtonPress, BtnText }) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="back" style={styles.icon} size={25} />
      </TouchableOpacity>
      <Text style={{ ...styles.txt, flex: 1, textAlign: "center" }}>
        {text}
      </Text>
      {BtnText && (
        <View style={styles.Button}>
          <TouchableOpacity onPress={handleButtonPress}>
            <Text style={{ ...styles.txt, color: "#8F00FF" }}>{BtnText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Center the items vertically
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    elevation: 5,
  },
  icon: {
    fontWeight: "bold",
  },
  txt: {
    fontSize: 18,
    fontWeight: "500",
  },
  Button: {
    justifyContent: "flex-end",
  },
});

export default CustomHeader;
