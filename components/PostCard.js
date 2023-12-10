import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import defaultImage from "../assets/defaultProfile.jpg";
import Entypo from "react-native-vector-icons/Entypo";
import Ant from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
const PostCard = ({ type = "", item }) => {
  const { userId } = useUser();
  const BASE_URL = "http://10.0.2.2:3000/api/v1/unilife";

  const navigation = useNavigation();
  const handleChatPressed = () => {
    navigation.navigate("ChatScreen", { recieverId: item.studentId });
  };
  const reserve = async () => {
    try {
      const token = await getTokenFromKeychain();

      // Assuming you have some data to update the post, replace the following line with your actual data
      const postData = {
        // Your updated post data here
      };

      const response = await axios.patch(
        `${BASE_URL}/post/reserve/${userId}/${item.id}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the state or perform any other actions as needed
    } catch (error) {
      if (error.response) {
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
      {type === "mine" && (
        <View
          style={{
            position: "absolute",
            top: 20,
            right: 15,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <AntDesign
              name="delete"
              size={25}
              color="#8F00FF"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <AntDesign name="edit" size={25} color="#8F00FF" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.profileImgCont}>
            <Image
              source={defaultImage}
              style={styles.profileImg}
              resizeMode="stretch"
            />
          </View>
          <Text style={styles.MainTxt}>{item.username}</Text>
        </View>
      </View>
      <View style={styles.Body}>
        <Text style={styles.descTxt}>{item.description}</Text>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.img}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.footerCont}>
        {type === "mine" && (
          <>
            <View style={styles.footer}>
              <View style={styles.footerMiddle}>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <Text style={styles.iconTxt}>Chat</Text>
                  <Ionicons name="chatbox-outline" size={22} />
                </TouchableOpacity>
              </View>
              <View style={styles.footerRight}>
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <Text style={styles.iconTxt}>Unreserve</Text>
                  <Ionicons name="lock-open-outline" size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        {type !== "mine" && (
          <View style={styles.footer}>
            <View style={styles.footerMiddle}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={handleChatPressed}
              >
                <Text style={styles.iconTxt}>Chat</Text>
                <Ionicons name="chatbox-outline" size={22} />
              </TouchableOpacity>
            </View>
            <View style={styles.footerRight}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={reserve}
              >
                <Text style={styles.iconTxt}>Reserve</Text>
                <Ionicons name="lock-open-outline" size={22} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {type == "mine" && (
        <View
          style={{
            ...styles.footer,
            marginVertical: 10,
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#8F00FF" }}>
            The Item Was Reserved By Khalid
          </Text>
        </View>
      )}
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
    flex: 1,
    justifyContent: "space-between",
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
  img: {
    alignSelf: "center",
    width: "100%",
    height: 300,
    marginTop: 10,
  },
  MainTxt: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  descTxt: {
    marginLeft: 15,
    marginRight: 5,

    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  Body: {},
  footerCont: {
    borderColor: "#333333",
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    marginTop: 5,

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
