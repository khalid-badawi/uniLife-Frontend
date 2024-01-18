import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Logo from "../assets/18-Nablus-Postoffice-October-7-9-scaled.jpg";
import Icon from "react-native-vector-icons/FontAwesome";
import DormitoryMap from "./DormitoryMap";
import CustomButton from "./CustomButton";
const DormitoryCard = () => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={Logo} style={styles.profileImg} resizeMode="stretch" />

          <View>
            <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: 16 }}>
              Khalid Badawi
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.imageCont}>
        <Image
          source={Logo}
          alt="Dormitory"
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.bottomPart}>
        <View style={styles.informationCont}>
          <Text style={styles.descText}>Rooms : 4</Text>

          {/* <View
            style={{ height: 10, backgroundColor: "#E3E3E3", marginTop: 10 }}
          ></View> */}
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="male"
              size={19}
              style={{ ...styles.icon, marginTop: 2 }}
            />
            <Text
              style={{
                ...styles.descText,
              }}
            >
              {" "}
              Males
            </Text>

            {false && (
              <>
                <Icon
                  name="female"
                  size={19}
                  style={{ ...styles.icon, marginTop: 2 }}
                />
                <Text
                  style={{
                    ...styles.descText,
                  }}
                >
                  {" "}
                  Females
                </Text>
              </>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="phone"
              size={18}
              style={{ ...styles.icon, marginTop: 2 }}
            />
            <Text
              style={{
                ...styles.descText,
              }}
            >
              {" "}
              0597401453
            </Text>
          </View>
          <Text style={styles.descText}>Services:</Text>
          <Text style={{ fontSize: 15, fontStyle: "italic" }}>
            Wifi, Laundaries, Studying Room, Wifi, Laundaries, Studying Room
          </Text>
        </View>
        <View style={styles.mapCont}>
          <DormitoryMap position={[35.2228, 32.22634]} />
          <View style={{ flexDirection: "row", marginTop: 2 }}>
            <Icon
              name="map-marker"
              size={15}
              style={{ ...styles.icon, marginTop: 3, color: "#8F00FF" }}
            />
            <Text
              style={{
                ...styles.descText,
                color: "#8F00FF",
                fontSize: 14,
              }}
            >
              {" "}
              9.7km to campus
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginVertical: 3,
          marginHorizontal: 5,
          borderTopColor: "gray",
          borderTopWidth: 0.5,
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              backgroundColor: "#8F00FF",
              color: "white",
              paddingHorizontal: 90,
              paddingVertical: 12,
              borderRadius: 25,
              marginVertical: 7,
              fontWeight: "bold",
            }}
          >
            View Rooms
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    paddingTop: 5,
    marginBottom: 10,
    marginHorizontal: 1,
    shadowColor: "#000",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 10,
  },
  imageCont: {
    alignSelf: "center",
    width: "100%",
    padding: 2,
    marginTop: 10,
  },
  image: { width: "100%", height: 300 },
  bottomPart: {
    display: "flex",
    flexDirection: "row",
  },
  informationCont: {
    width: "50%",
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
  mapCont: { width: "50%", marginVertical: 5, paddingRight: 3 },
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

export default DormitoryCard;
