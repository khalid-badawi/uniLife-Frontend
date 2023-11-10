import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Map from "../components/Map";
export default function MapScreen() {
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.root}>
      <View style={{ ...styles.mapCont, height: 0.6 * height }}>
        <Map />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  mapCont: {},
});
