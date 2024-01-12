import { Alert } from "react-native";

const showConfirmationDialog = (title, message) => {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
        { text: "OK", onPress: () => resolve(true) },
      ],
      { cancelable: false }
    );
  });
};

export default showConfirmationDialog;
