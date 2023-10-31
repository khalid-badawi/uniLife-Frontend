import "react-native-gesture-handler";
import React from "react";

import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./navigation/Navigation";

import Constants from "expo-constants";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
    justifyContent: "center",
  },
});

export default App;
