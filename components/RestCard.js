import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import test from "../assets/test.jpg";

import Icon from "react-native-vector-icons/AntDesign";
import { Pressable } from "react-native";
const truncateText = (text, limit) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  } else {
    return text;
  }
};
const RestCard = ({ visitRest, title, rating, description }) => {
  const desc =
    "asdljksads sadl sakjdjladasdsad ksad ljksad lkasdl ksad lkjsad lksadj lsakdj lksadj aslkdj salkdj aslkjd saldj  sa dlksad jsad lsakd jsaldk jsalkd ";
  const truncatedDescription = truncateText(desc, 8); // Change 10 to your desired word limit

  return (
    <Pressable onPress={visitRest}>
      <View style={styles.root}>
        <Image
          source={test}
          style={styles.img} // Fixed style object
          resizeMode="contain"
        />

        <View style={styles.textCont}>
          <Text style={styles.mainTxt}>Friesday</Text>

          <Text style={{ flex: 1, flexWrap: "wrap" }}>
            {truncatedDescription}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <Icon name="star" style={styles.icon} size={20} />
            <Text style={{ fontSize: 15 }}>(4.5)</Text>
          </View>
        </View>

        <View style={{ position: "absolute", bottom: 7, right: 7 }}>
          <TouchableOpacity onPress={visitRest}>
            <Icon name="arrowright" style={styles.icon} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 25,

    elevation: 10,
    shadowRadius: 6,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
    height: 105,
  },
  img: {
    width: 100,
    height: 100,
    margin: 2,
    borderRadius: 25,
  },
  textCont: {
    width: "60%",
    margin: 10,
  },
  mainTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },

  icon: {
    color: "#8F00FF",
  },
});

export default RestCard;
