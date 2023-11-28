import { View, Text, Modal, StyleSheet, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import test2 from "../assets/test2.png";
import CustomHeader from "./CustomHeader";
const ItemDetails = ({ isVisible, closeModal, item }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.root}>
        <CustomHeader onPress={closeModal} text="Details" />
        <Image
          source={test2}
          style={styles.img} // Fixed style object
          resizeMode="contain"
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.mainTxt}>{item.itemName}</Text>
          <Text style={styles.descTxt}>{item.itemDescription}</Text>
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
