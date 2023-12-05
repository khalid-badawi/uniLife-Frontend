import React from "react";

import { View, StyleSheet, StatusBar, Text } from "react-native";
import Navigation from "./navigation/Navigation";
import { UserProvider } from "./Contexts/UserContext";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <UserProvider>
        <Navigation />
      </UserProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
