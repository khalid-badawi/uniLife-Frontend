import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../assets/defaultProfile.jpg";
import FastImage from "react-native-fast-image";

const NotificationCard = ({ item }) => {
  const formattedDateTime = new Date(item.createdAt).toLocaleString();

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: item.seen ? "white" : "#EAEAEA" },
      ]}
    >
      <FastImage
        source={item.image !== "" && item.image ? { uri: item.image } : Logo}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.txt}>
          {item.text}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "gray", marginTop: 5 }}>
            {formattedDateTime}
          </Text>
          {/* {!item.seen && (
            <Text style={{ color: "gray", marginTop: 5 }}>new</Text>
          )} */}
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    backgroundColor: "#EAEAEA",
    padding: 10,
    width: "100%",
    marginBottom: 5,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },
  textContainer: {
    flex: 1, // Added flex to allow text to take remaining space
    marginLeft: 10,
    alignSelf: "center",
  },
  txt: {
    fontWeight: "500",
    fontSize: 15,
    marginTop: 2,
  },
});
