import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import Logo from "../assets/18-Nablus-Postoffice-October-7-9-scaled.jpg";
import Icon from "react-native-vector-icons/FontAwesome";
import DormitoryMap from "./DormitoryMap";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../BaseUrl";
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
import showConfirmationDialog from "./Confirmation";
import FastImage from "react-native-fast-image";
const DormitoryCard = ({ item, posts, setPosts, type }) => {
  console.log(item);
  const navigation = useNavigation();
  const { userId } = useUser();
  const savePost = async () => {
    try {
      const confirmed = await showConfirmationDialog(
        "Confirmation",
        "Are you sure you want to save this post?"
      );

      if (confirmed) {
        const token = await getTokenFromKeychain();
        console.log(userId, item.id, token);

        const response = await axios.post(
          `${BASE_URL}/domitorysave/${userId}/${item.id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Success", "Post Saved Successfully");
        const updated = posts.map((post) => {
          return post.id === item.id ? { ...post, saved: true } : post;
        });
        setPosts(updated);
        // Update the state or perform any other actions as needed
      } else {
        // User canceled the operation
        console.log("save canceled");
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
        Alert.alert("Error", error.response.data.message);
      } else if (error.request) {
        Alert.alert(
          "Network Error",
          "There was a problem with the network. Please check your internet connection and try again.",
          [{ text: "OK" }]
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert(
          "Something Wrong",
          "Something went wrong, try again please",
          [{ text: "OK" }]
        );
      }
    }
  };
  const unsavePost = async () => {
    try {
      const confirmed = await showConfirmationDialog(
        "Confirmation",
        "Are you sure you want to unsave this post?"
      );

      if (confirmed) {
        const token = await getTokenFromKeychain();
        console.log(userId, item.id, token);

        const response = await axios.delete(
          `${BASE_URL}/domitorysave/${userId}/${item.id}`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Success", "Post unsaved Successfully");
        const updated = posts.filter((post) => {
          return post.id !== item.id;
        });
        setPosts(updated);
        // Update the state or perform any other actions as needed
      } else {
        // User canceled the operation
        console.log("save canceled");
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
        Alert.alert("Error", error.response.data.message);
      } else if (error.request) {
        Alert.alert(
          "Network Error",
          "There was a problem with the network. Please check your internet connection and try again.",
          [{ text: "OK" }]
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert(
          "Something Wrong",
          "Something went wrong, try again please",
          [{ text: "OK" }]
        );
      }
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View
          style={{
            display: "flex",
            flex: 1,
            marginRight: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FastImage
              source={item.image !== "" ? { uri: item.ownerImage } : Logo}
              style={styles.profileImg}
              resizeMode={FastImage.resizeMode.stretch}
            />

            <View>
              <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: 16 }}>
                {item.username}
              </Text>
            </View>
          </View>
          {!type &&
            (!item.saved ? (
              <TouchableOpacity onPress={savePost}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#8F00FF",
                    fontSize: 15,
                    marginRight: 10,
                    alignSelf: "center",
                  }}
                >
                  Bookmark
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  fontSize: 15,
                  color: "gray",
                  marginRight: 10,
                  alignSelf: "center",
                }}
              >
                Bookmarked
              </Text>
            ))}
          {type === "saved" && (
            <TouchableOpacity onPress={unsavePost}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#8F00FF",
                  fontSize: 15,
                  marginRight: 10,
                  alignSelf: "center",
                }}
              >
                remove
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.imageCont}>
        <FastImage
          source={item.image !== "" ? { uri: item.image } : null}
          alt="Dormitory Photo"
          style={styles.image}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
      <View style={styles.bottomPart}>
        <View style={styles.informationCont}>
          <Text style={styles.descText}>Rooms : {item.numRooms}</Text>

          {/* <View
            style={{ height: 10, backgroundColor: "#E3E3E3", marginTop: 10 }}
          ></View> */}
          <View style={{ flexDirection: "row" }}>
            {item.gender === "male" && (
              <>
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
              </>
            )}

            {item.gender === "female" && (
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
              {item.phoneNum}
            </Text>
          </View>
          <Text style={styles.descText}>Services:</Text>
          <Text style={{ fontSize: 15, fontStyle: "italic" }}>
            {item.services}{" "}
          </Text>
        </View>
        <View style={styles.mapCont}>
          <DormitoryMap position={[item.lon, item.lat]} />
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
              {item.distance}km to campus
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
        <TouchableOpacity
          style={{ width: "100%", alignItems: "center" }}
          onPress={() =>
            navigation.navigate("RoomsScreen", { item: item.room })
          }
        >
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
