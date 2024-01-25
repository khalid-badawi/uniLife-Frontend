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

const PickImageSmall = ({
  image,
  setImage,
  iconName,
  size = 25,
  sendImage,
  onImageSelected,
}) => {
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
      onImageSelected(result.assets[0]);

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
      <Icon
        name={iconName}
        size={size}
        style={styles.icon}
        onPress={openGallery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: "#8F00FF",

    borderRadius: 30,
  },
  icon: { color: "white" },
});

export default PickImageSmall;
