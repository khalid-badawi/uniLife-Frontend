import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import { Alert } from "react-native";

const PickImage = ({ image, setImage }) => {
  const pickImage = async (sourceType) => {
    let result;
    if (sourceType === "camera") {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    console.log(result);

    if (!result.canceled) {
      await saveImage(result.assets[0]);
      console.log(image);
    }
  };
  const saveImage = async (image) => {
    try {
      setImage(image);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const openCamera = () => {
    pickImage("camera");
  };

  const openGallery = () => {
    pickImage("gallery");
  };

  return (
    <View style={styles.root}>
      {!image && (
        <>
          <TouchableOpacity onPress={openCamera}>
            <View style={styles.iconCont}>
              <Icon name="camera" style={styles.icon} size={40} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery}>
            <View style={styles.iconCont}>
              <Icon name="image" style={styles.icon} size={40} />
            </View>
          </TouchableOpacity>
        </>
      )}

      {image && (
        <View
          style={{
            height: "80%",
            width: "80%",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              zIndex: 100,
              backgroundColor: "",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setImage("");
              }}
            >
              <Icon
                name="x-circle"
                size={25}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: image.uri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center" },
  icon: { color: "#8F00FF" },
  iconCont: {
    marginVertical: 10,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 80,
    borderColor: "gray",
    borderWidth: 0.2,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default PickImage;
