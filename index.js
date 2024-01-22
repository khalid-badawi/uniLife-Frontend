import { registerRootComponent } from "expo";

import App from "./App";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";
import Logo from "./assets/Logo1.png";
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    const notificationTime = new Date(Date.now()).toLocaleString(); // Get the current time in a readable format
    const notificationMessage = `${notification.message}\n\n${notificationTime}`;
    PushNotification.localNotification({
      channelId: "your-channel-id",
      title: notification.title,
      message: notificationMessage,
      largeIcon: Logo,
    });

    // Handle notification in background or when the app is closed
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});
PushNotification.createChannel(
  {
    channelId: "your-channel-id", // Set your own unique channel ID
    channelName: "Your Channel Name",
    channelDescription: "A channel to categorize your notifications",
    soundName: "default",
    importance: 4, // Set the importance level (0 - 4)
    vibrate: true,
  },
  (created) => console.log(`Channel created: ${created}`)
);
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

registerRootComponent(App);
