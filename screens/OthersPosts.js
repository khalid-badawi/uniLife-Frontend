import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import defaultImage from "../assets/defaultProfile.jpg";
const OthersPosts = () => {
  return (
    <View style={styles.root}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.imageCont}>
          <Image
            source={defaultImage}
            alt="Profile Image"
            style={styles.image} // Fixed style object
            resizeMode="stretch"
          />
        </View>
      </View>
      <View style={styles.userDetails}>
        <Text style={{ fontSize: 20, color: "#8F00FF", fontWeight: "bold" }}>
          Khalid Badawi
        </Text>
        <Text style={{ fontSize: 15, color: "#8F00FF" }}>
          Computer Engineering
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1 },
  image: {
    width: 200,
    height: 200,
    borderRadius: 150,
    position: "absolute",
    bottom: -70,
    borderColor: "white",
    borderWidth: 2,
  },
  imageCont: {
    width: "130%",
    height: 200,
    backgroundColor: "#8F00FF",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    alignItems: "center",
  },
  userDetails: { alignItems: "center", marginTop: 80 },
});
export default OthersPosts;
