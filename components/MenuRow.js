import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const MenuRow = ({ itemText, quantity, color = "white" }) => {
  const dots = ".".repeat(1000 - itemText.length);
  console.log(quantity);
  return (
    <View style={styles.root}>
      <Text style={{ ...styles.txt, color }}>{itemText}</Text>
      <Text style={{ ...styles.dots, color }} numberOfLines={1}>
        {dots}
      </Text>
      <Text style={{ ...styles.txt, color }}>({quantity})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginVertical: 5,
    width: "100%",
  },
  txt: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dots: {
    flex: 1,
    textAlign: "center",
    marginHorizontal: 1,
    fontSize: 16,
  },
  end: {},
});

export default MenuRow;
