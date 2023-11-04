import "react-native-gesture-handler";
import React from "react";

import { View, StyleSheet } from "react-native";
import Navigation from "./navigation/Navigation";

import Constants from "expo-constants";

const App = () => {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
});

export default App;
