import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import test from "../assets/test.jpg";
import test2 from "../assets/test2.png";
import Icon from "react-native-vector-icons/AntDesign";

const MenuItem = ({ type = "order" }) => {
  return (
    <View style={styles.root}>
      <Image
        source={test2}
        style={styles.img} // Fixed style object
        resizeMode="contain"
      />

      <View style={styles.textCont}>
        <Text style={styles.mainTxt}>Cheese burger</Text>
        <Text style={{ color: "gray" }}>cheese burger</Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 12,
          left: 15,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          20 NIS
        </Text>
      </View>
      {type === "order" && (
        <View
          style={{
            position: "absolute",
            bottom: 12,
            right: 10,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <Icon name="minussquare" style={styles.icon} size={22} />
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 5 }}>2</Text>
          <TouchableOpacity>
            <Icon name="plussquare" style={styles.icon} size={22} />
          </TouchableOpacity>
        </View>
      )}
      {type === "menu" && (
        <View
          style={{
            position: "absolute",
            bottom: 12,
            right: 10,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={{ color: "#8F00FF", fontWeight: "600" }}>details</Text>
            <Icon name="arrowright" style={styles.icon} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 10,
    shadowRadius: 6,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.1,
    height: 250,
    width: 180,
    borderColor: "#8F00FF",
    borderWidth: 1,
  },

  img: {
    alignSelf: "center",
    width: 170,
    height: 150,
    borderRadius: 75,
    marginVertical: 0,
  },
  textCont: {
    width: "100%",
    marginLeft: 15,
  },
  mainTxt: {
    fontWeight: "bold",
    fontSize: 18,
  },

  icon: {
    color: "#8F00FF",
  },
});
export default MenuItem;
