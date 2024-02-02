import { View, Text, Modal, StyleSheet, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import test2 from "../assets/test2.png";
import CustomHeader from "../navigation/CustomHeader";
import FastImage from "react-native-fast-image";
const ItemDetails = ({ isVisible, closeModal, item }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.root}>
        <CustomHeader close={closeModal} title="Details" />
        <FastImage
          source={{ uri: item.image }}
          alt="Menu Item image"
          style={styles.img} // Fixed style object
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.mainTxt}>{item.nameOfFood}</Text>
          <Text style={styles.descTxt}>{item.description}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
  },
  img: {
    marginTop: 20,
    alignSelf: "center",
    width: "70%",
    height: "40%",
    marginVertical: 0,
  },
  descriptionContainer: {
    backgroundColor: "#8F00FF",
    height: "100%",
    borderRadius: 40,
    marginTop: 20,
    padding: 15,
    paddingTop: 40,
    alignItems: "center",
  },
  descTxt: {
    color: "white",
    fontSize: 15,
  },
  mainTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
export default ItemDetails;
