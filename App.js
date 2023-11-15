import React from "react";

import { View, StyleSheet } from "react-native";
import Navigation from "./navigation/Navigation";
import { UserProvider } from "./Contexts/UserContext";

const App = () => {
  return (
    <View style={styles.container}>
      <UserProvider>
        <Navigation />
      </UserProvider>
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
