import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import test from "../assets/test.jpg";
import test2 from "../assets/test2.png";
import Icon from "react-native-vector-icons/AntDesign";
import ItemDetails from "./ItemDetails";
import CustomButton from "./CustomButton";

const MenuItem = ({ item, setOrderContent, orderContent }) => {
  return (
    <View style={styles.root}>
      <Image
        source={test2}
        style={styles.img} // Fixed style object
        resizeMode="stretch"
      />
      <Text style={styles.mainTxt}>{item.itemName}</Text>
      <Text style={styles.descTxt}>{item.itemDescription}</Text>

      <View style={{ position: "absolute", top: 7, left: 7 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {item.price}₪
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#8F00FF" }}>
            Visit Sa7eeta
          </Text>
          <Icon name="arrowright" style={{ ...styles.icon }} size={21} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,

    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 10,

    paddingBottom: 10,
    width: 250,
    alignSelf: "center",
  },

  img: {
    alignSelf: "center",
    width: "60%",
    height: 130,
  },
  textCont: {
    width: "100%",
    marginLeft: 15,
  },
  mainTxt: {
    fontWeight: "bold",
    fontSize: 20,
    //color: "#8F00F0",
    marginLeft: 15,
    alignSelf: "center",
    marginBottom: 10,
  },
  descTxt: {
    marginLeft: 15,
    marginRight: 2,
  },

  icon: {
    color: "#8F00FF",
  },
});
export default MenuItem;
