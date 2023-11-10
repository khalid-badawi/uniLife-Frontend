import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Map from "../components/Map";
export default function MapScreen() {
  return (
    <View style={{ height: 400 }}>
      <Map />
    </View>
  );
}
