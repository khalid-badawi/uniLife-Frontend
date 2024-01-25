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
import { SearchProvider } from "./Contexts/SearchContext";
import StickyAd from "./components/StickyAd";
import { AdProvider } from "./Contexts/AdContext";
import { DrawerProvider } from "./Contexts/openContext";
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchProvider>
        <AdProvider>
          <DrawerProvider>
            <UserProvider>
              <Navigation />
            </UserProvider>
          </DrawerProvider>
        </AdProvider>
      </SearchProvider>
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
