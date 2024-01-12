import React from "react";

import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Navigation from "./navigation/Navigation";
import { UserProvider } from "./Contexts/UserContext";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <Navigation />
      </UserProvider>
      <StatusBar barStyle="light-content" backgroundColor="#A100FF" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default App;
