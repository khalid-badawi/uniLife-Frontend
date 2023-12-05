import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import defaultImage from "../assets/defaultProfile.jpg";
import Entypo from "react-native-vector-icons/Entypo";
import Ant from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const PostCard = () => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.profileImgCont}>
          <Image
            source={defaultImage}
            style={styles.profileImg}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.MainTxt}>Khalid Badawi</Text>
      </View>
      <View style={styles.Body}>
        <Text style={styles.descTxt}>English 101 Book</Text>
        <Image
          source={defaultImage}
          style={styles.MainImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.footerCont}>
        <View style={styles.footer}>
          <View style={styles.footerMiddle}>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <Text style={styles.iconTxt}>Chat</Text>
              <Ionicons name="chatbox-outline" size={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.footerRight}>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <Text style={styles.iconTxt}>Reserve</Text>
              <Ionicons name="lock-open-outline" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ height: 10, backgroundColor: "#E3E3E3" }}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: "100%",
    backgroundColor: "white",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  profileImg: {
    width: 40,
    height: 40,
  },
  profileImgCont: {
    borderRadius: 20,
    backgroundColor: "blue",
  },
  MainImage: {
    width: "100%",
  },
  MainTxt: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 16,
  },
  descTxt: {
    marginLeft: 15,
    marginRight: 5,

    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  Body: {
    marginBottom: 5,
  },
  footerCont: {
    borderColor: "#333333",
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    marginTop: 10,

    padding: 10,
  },
  footer: {
    flexDirection: "row",
    marginHorizontal: 20,
  },

  footerMiddle: {
    width: "50%",
    alignItems: "center",
  },
  footerRight: {
    width: "50%",

    alignItems: "center",
    marginRight: 10,
  },
  iconTxt: { marginRight: 3 },
});
export default PostCard;
