import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Logo from "../assets/18-Nablus-Postoffice-October-7-9-scaled.jpg";
import Icon from "react-native-vector-icons/FontAwesome";
import DormitoryMap from "./DormitoryMap";
import CustomButton from "./CustomButton";
const RoomsCard = ({ item, index }) => {
  console.log(item);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const typeCap = capitalizeFirstLetter(item.type);
  return (
    <View style={styles.root}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginLeft: 5,
          color: "#8F00FF",
          marginBottom: 5,
        }}
      >
        Room {index + 1}
      </Text>

      <View style={styles.imageCont}>
        <Image
          source={item.image !== "" ? { uri: item.image } : null}
          alt="Dormitory"
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.bottomPart}>
        <View style={styles.informationCont}>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.descText}>{typeCap} Room</Text>

            <View style={{ flexDirection: "row" }}>
              {/* <Icon
                name="male"
                size={19}
                style={{ ...styles.icon, marginTop: 2 }}
              /> */}
              <Text
                style={{
                  ...styles.descText,
                }}
              >
                {" "}
                {item.avilableSeat} Places Available({item.numberOfPerson}{" "}
                Total)
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <View></View>
            <Text style={{ ...styles.descText, color: "#8F00FF" }}>
              Monthly Rent:{item.rent}₪
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginVertical: 3,
          marginHorizontal: 5,

          alignItems: "center",
        }}
      ></View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    paddingTop: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 10,
  },
  imageCont: {
    alignSelf: "center",
    width: "100%",
    padding: 2,
    marginTop: 5,
  },
  image: { width: "100%", height: 300 },
  bottomPart: {
    display: "flex",
    flexDirection: "row",
  },
  informationCont: {
    width: "100%",
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  profileImgCont: {
    marginTop: 10,
  },

  descText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    letterSpacing: 0.5,
    lineHeight: 22,
    // Adjust line height for better vertical spacing
  },
  icon: {},
});

export default RoomsCard;
