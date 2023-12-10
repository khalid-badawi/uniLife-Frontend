import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import test1 from "../assets/defaultProfile.jpg";

const ChatCard = () => {
  return (
    <View style={styles.root}>
      <Image
        source={test1}
        style={styles.img} // Fixed style object
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <View style={styles.row1}>
          <Text style={styles.mainTxt}>Khalid Badawi</Text>
          <Text style={{ ...styles.txt, marginRight: 5 }}>Today</Text>
        </View>
        <View style={styles.row2}>
          <Text style={styles.txt} numberOfLines={1}>
            Hello how are you man ggggggg gggggggggg what u want
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#5A5A5A",
    borderBottomWidth: 0.5,

    padding: 10,
    paddingBottom: 20,
  },
  img: { borderRadius: 25, width: 50, height: 50 },

  row1: {
    flexDirection: "row",
    paddingTop: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  mainTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row2: {
    paddingLeft: 16,
    flexDirection: "row",
    width: "90%",
  },
  txt: {
    fontSize: 13,
    color: "#5A5A5A",
  },
});
export default ChatCard;
