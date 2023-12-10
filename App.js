import React from "react";

import { View, StyleSheet, StatusBar, Text, Alert } from "react-native";
import Navigation from "./navigation/Navigation";
import { UserProvider } from "./Contexts/UserContext";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";
const App = () => {
  // React.useEffect(() => {
  //   PushNotification.getChannels(function (channel_ids) {
  //     channel_ids.forEach((id) => {
  //       PushNotification.deleteChannel(id);
  //     });
  //   });
  //   PushNotification.createChannel(
  //     {
  //       channelId: "your-channel-id", // (required)
  //       channelName: "your_channel_name", // (required)
  //       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
  //       playSound: true, // (optional) default: tru
  //       importance: 4, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  //     },
  //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  // }, []);
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   if (enabled) {
  //     console.log("Auth Status:", authStatus);
  //   }
  // }
  // const NotificationListner = () => {
  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //   });

  //   messaging().onMessage(async (remoteMessage) => {
  //     // Display a foreground notification here
  //     Alert.alert("New Notification", remoteMessage.notification.body, [
  //       { text: "OK" },
  //     ]);
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quit state:",
  //           remoteMessage.notification
  //         );
  //       }
  //     });
  // };
  // useEffect(() => {
  //   requestUserPermission();
  //   NotificationListner();
  // }, []);
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
