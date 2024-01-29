import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../assets/Logo2.png";

const BlockedScreen = () => {
  return (
    <View style={styles.root}>
      <Image source={Logo} alt="Profile Image" style={styles.logo} />

      <Text
        style={{
          fontSize: 25,
          alignSelf: "center",
          marginBottom: 5,
          color: "#8F00FF",
          fontWeight: "bold",
        }}
      >
        Oops!
      </Text>
      <Text style={styles.txt}>
        Your account has been blocked, Contact unilife@gmail.com for help
      </Text>
    </View>
  );
};

export default BlockedScreen;

const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1, padding: 15 },
  txt: { fontSize: 16, fontWeight: "bold", alignSelf: "center" },
  logo: {
    height: 300,
    width: "80%",

    alignSelf: "center",
    marginTop: 30,

    objectFit: "contain",
  },
});
