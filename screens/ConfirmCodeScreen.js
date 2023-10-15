import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import CodeInput from "react-native-confirmation-code-input";
import Logo from "../assets/Logo2.png";

const ConfirmCodeScreen = () => {
  const { height, width } = useWindowDimensions();
  return (
    <View style={{ ...styles.root, width: width }}>
      <Image
        source={Logo}
        style={{ ...styles.logo, height: height * 0.4, width: width }} // Fixed style object
        resizeMode="contain"
      />
      <Text style={styles.mainText}>Reset Password</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },

  logo: {
    marginBottom: 10,
  },
  animInput: {
    width: "100%",
  },
  mainText: {
    alignItems: "center",
    fontSize: 25,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#643b66",
  },
});
export default ConfirmCodeScreen;
