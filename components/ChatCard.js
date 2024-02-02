import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

import test1 from "../assets/defaultProfile.jpg";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

const ChatCard = ({ item }) => {
  const formattedDateTime = new Date(item.createdAt).toLocaleString();
  const navigation = useNavigation();
  console.log(item.otherPersonId);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chat Screen", {
          receiverId: item.otherPersonId,
          userName: item.username,
          otherImage: item.userimage,
        })
      }
    >
      <View style={styles.root}>
        <FastImage
          source={
            item.userimage !== "" && item.userimage
              ? { uri: item.userimage }
              : test1
          }
          style={styles.img} // Fixed style object
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.row1}>
            <Text style={styles.mainTxt}>{item.username}</Text>
            <Text style={{ ...styles.txt, marginRight: 5, marginTop: 2 }}>
              {formattedDateTime}
            </Text>
          </View>
          <View style={styles.row2}>
            <Text style={{ ...styles.txt, marginTop: 1 }} numberOfLines={1}>
              {item.text ? item.text : "image message..."}
            </Text>
            {item.unseenMessageCount !== 0 && (
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 50,
                  backgroundColor: "#8F00FF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    ...styles.txt,
                    color: "white",
                    fontSize: 15,
                    marginLeft: 1,
                  }}
                >
                  {item.unseenMessageCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#8F00FF",
    borderBottomWidth: 1,

    padding: 10,
    paddingBottom: 15,
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
    marginTop: 2,
    width: "100%",
    justifyContent: "space-between",
  },
  txt: {
    fontSize: 13,
    color: "#5A5A5A",
  },
});
export default ChatCard;
