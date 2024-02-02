import React, { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAd } from "../Contexts/AdContext";
import Icon from "react-native-vector-icons/FontAwesome";
import WebView from "react-native-webview";
import { Button } from "react-native-elements";
import FastImage from "react-native-fast-image";
const StickyAd = ({ title, description, imageUrl, link }) => {
  const { isVisible, handleHideAd } = useAd();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleHidePress = () => {
    handleHideAd(false);
  };

  if (!isVisible) {
    return null; // Return null to render nothing if not visible
  }
  console.log(link);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsModalVisible(true)}
    >
      <FastImage source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.textContainer}>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={{ marginRight: 5 }}
            onPress={handleHidePress}
          >
            <Icon name="close" size={16} />
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
      <Text
        style={{
          position: "absolute",
          bottom: 2,
          right: 10,
          color: "gray",
        }}
      >
        ADs
      </Text>
      {link && (
        <Modal style={styles.modal} visible={isModalVisible}>
          <WebView
            source={{
              uri: link,
            }}
            style={{ flex: 1 }}
          ></WebView>
          <Button
            title="Return To App"
            onPress={() => setIsModalVisible(false)}
          />
        </Modal>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#EAEAEA", // Light gray background
    padding: 10,
    paddingVertical: 5,
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
    width: "90%",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
});

export default StickyAd;
