import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useReducer, useState } from "react";
import defaultImage from "../assets/defaultProfile.jpg";
import Entypo from "react-native-vector-icons/Entypo";
import Ant from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import showConfirmationDialog from "./Confirmation";
import BASE_URL from "../BaseUrl";
import CustomButton from "./CustomButton";
import { TextInput } from "react-native-gesture-handler";
const PostCard = ({
  type = "",
  item,
  forceUpdate,
  setPosts,
  posts,
  postsMain,
  setPostsMain,
  selectedButton,
}) => {
  const { userId } = useUser();
  console.log("item:", item.image);
  const navigation = useNavigation();
  const handleChatPressed = () => {
    navigation.navigate("ChatScreen", { receiverId: item.userId });
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  const handleConfirm = async () => {
    await handeReport();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  console.log(item.major);
  const reserve = async () => {
    try {
      const confirmed = await showConfirmationDialog(
        "Confirmation",
        "Are you sure you want to reserve this item?"
      );

      if (confirmed) {
        const token = await getTokenFromKeychain();
        console.log(userId, item.id, token);

        const response = await axios.patch(
          `${BASE_URL}/post/reserve/${userId}/${item.id}`,
          {}, // Empty object for the request body
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Success", "Item Reserved Successfully");
        forceUpdate();
        // Update the state or perform any other actions as needed
      } else {
        // User canceled the operation
        console.log("Reservation canceled");
      }
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
  const unreserve = async () => {
    try {
      const confirmed = await showConfirmationDialog(
        "Confirmation",
        "Are you sure you want to unreserve this item?"
      );

      if (confirmed) {
        const token = await getTokenFromKeychain();

        // Assuming you have some data to update the post, replace the following line with your actual data

        const response = await axios.patch(
          `${BASE_URL}/post/unreserve/${userId}/${item.id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Success", "Item Unreserved Successfully");
        const newPost = posts.map((post) =>
          post.id === item.id ? { ...post, reservedBy: null } : post
        );
        setPosts(newPost);

        // Update the state or perform any other actions as needed
      } else {
        // User canceled the operation
        console.log("Reservation canceled");
      }
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
  const handeReport = async () => {
    try {
      const token = await getTokenFromKeychain();
      console.log(reportMessage);
      const response = await axios.post(
        `http://10.0.2.2:3000/api/v1/unilife/report/${userId}/${item.userId}/${item.id}`,
        JSON.stringify({ message: reportMessage }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "Post Reported Successfully");
      const filtered = postsMain.filter((post) => post.id !== item.id);
      setPostsMain(filtered);
      console.log("gg");
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
  function formatAMPM(date) {
    const newDate = new Date(date);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return newDate.toLocaleString("en-US", options);
  }
  const deletePost = async () => {
    try {
      const confirmed = await showConfirmationDialog(
        "Confirmation",
        "Are you sure you want to delete this item?"
      );

      if (confirmed) {
        const token = await getTokenFromKeychain();

        // Assuming you have some data to update the post, replace the following line with your actual data

        const response = await axios.delete(
          `${BASE_URL}/post/${userId}/${item.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Success", "Item Deleted Successfully");
        const filtered = posts.filter((post) => post.id !== item.id);
        setPosts(filtered); // Update the state or perform any other actions as needed
      } else {
        // User canceled the operation
        console.log("Reservation canceled");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
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
      <View style={{ height: 5, backgroundColor: "#E3E3E3" }}></View>

      {type === "mine" && (
        <View
          style={{
            position: "absolute",
            top: 20,
            right: 15,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={deletePost}
          >
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
      {type !== "mine" && type !== "reserved" && (
        <View
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "#8F00FF", fontWeight: "bold" }}>Report</Text>
            <MaterialIcon name="report-problem" size={17} color="#8F00FF" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.profileImgCont}
            onPress={() =>
              navigation.navigate("OthersPosts", {
                otherId: item.userId,
                userImage: item.userImage,
                username: item.username,
                major: item.major,
              })
            }
          >
            <Image
              source={
                item.userImage === "" || !item.userImage
                  ? defaultImage
                  : { uri: item.userImage }
              }
              alt="profile image"
              style={styles.profileImg}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("OthersPosts", {
                  otherId: item.userId,
                  userImage: item.userImage,
                  username: item.username,
                  major: item.major,
                })
              }
            >
              <Text style={styles.MainTxt}>{item.username}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, color: "gray", marginLeft: 8 }}>
              {formatAMPM(item.createdAt)}
            </Text>
          </View>
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
        {type === "mine" && item.reservedBy && (
          <>
            <View style={{ ...styles.footer, justifyContent: "center" }}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={unreserve}
              >
                <Text
                  style={{
                    ...styles.iconTxt,
                    fontWeight: "bold",
                    color: "#8F00FF",
                    fontSize: 16,
                  }}
                >
                  Remove Reservation
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {type !== "mine" && (
          <View style={{ ...styles.footer, justifyContent: "center" }}>
            {type !== "reserved" && (
              <View style={styles.footerMiddle}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={handleChatPressed}
                >
                  <Text style={styles.iconTxt}>Chat</Text>
                  <Ionicons name="chatbox-outline" size={22} />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.footerRight}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={type === "reserved" ? unreserve : reserve}
              >
                <Text style={styles.iconTxt}>
                  {type === "reserved" ? "Unreserve" : "Reserve"}
                </Text>
                <Ionicons name="lock-open-outline" size={22} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {type == "mine" && item.reservedBy && (
        <View
          style={{
            ...styles.footer,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Reserved By {item.reservedBy}
          </Text>
        </View>
      )}
      <View style={{ height: 10, backgroundColor: "#E3E3E3" }}></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "95%",
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
              borderTopRightRadius: 15,
            }}
          >
            <TextInput
              multiline
              numberOfLines={10}
              placeholder="Report Reasoning?"
              value={reportMessage}
              onChangeText={(text) => setReportMessage(text)}
              style={{
                borderWidth: 1,
                borderColor: "#8F00FF",
                borderRadius: 5,
                padding: 5,
                fontSize: 16,

                marginBottom: 10,
              }}
            />
            <View style={{}}>
              <CustomButton
                text="Confirm"
                onPress={handleConfirm}
                type="Tertiary"
                backgroundColor="transparent"
              />
              <CustomButton
                text="Cancel"
                type="Tertiary"
                onPress={handleCancel}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: "100%",
    backgroundColor: "white",
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
    borderRadius: 50,
  },
  profileImgCont: {
    marginTop: 10,
  },
  img: {
    alignSelf: "center",
    width: "100%",
    height: 300,
    marginTop: 10,
  },
  MainTxt: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
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
