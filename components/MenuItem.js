import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import test from "../assets/test.jpg";
import test2 from "../assets/test2.png";
import Icon from "react-native-vector-icons/AntDesign";

const MenuItem = ({ item }) => {
  return (
    <View style={styles.root}>
      <Image
        source={test2}
        style={styles.img} // Fixed style object
        resizeMode="stretch"
      />
      <Text style={styles.mainTxt}>{item.itemName}</Text>
      <Text style={styles.descTxt}>{item.itemDescription}</Text>
      <View
        style={{
          flexDirection: "row",

          marginTop: 20,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "25%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            20₪
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <TouchableOpacity>
            <Icon name="minussquare" style={styles.icon} size={25} />
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 5 }}>2</Text>
          <TouchableOpacity>
            <Icon name="plussquare" style={styles.icon} size={25} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "25%",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#8F00FF" }}>
              details
            </Text>
            <Icon name="arrowright" style={{ ...styles.icon }} size={21} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 10,
    shadowRadius: 6,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
    paddingBottom: 10,
    width: "90%",
    alignSelf: "center",
  },

  img: {
    alignSelf: "center",
    width: "60%",
    height: 170,

    marginVertical: 0,
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
