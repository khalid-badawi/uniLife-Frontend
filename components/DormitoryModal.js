import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";
import { Picker } from "@react-native-picker/picker";
const types = ["All", "Relevant"];
const distances = ["All", "Books", "Equipments"];
const DormitoryModal = ({
  visible,
  closeModal,
  major,
  handleMajorChange,
  distance,
  setdistance,
  getPosts,
  type,
  setType,
}) => {
  const onPress = () => {
    closeModal();
    //getPosts();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.txt}>Type:{"        "} </Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}
              >
                {types.map((type, index) => (
                  <Picker.Item key={index} label={type} value={type} />
                ))}
              </Picker>
            </View>
          </View>
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.txt}>Distance{":  "}</Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={distance}
                onValueChange={(itemValue, itemIndex) => setdistance(itemValue)}
              >
                {distances.map((distance, index) => (
                  <Picker.Item key={index} label={distance} value={distance} />
                ))}
              </Picker>
            </View>
          </View>
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.txt}>Price{":        "}</Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={distance}
                onValueChange={(itemValue, itemIndex) => setdistance(itemValue)}
              >
                {distances.map((distance, index) => (
                  <Picker.Item key={index} label={distance} value={distance} />
                ))}
              </Picker>
            </View>
          </View>
          {/* Your filter options and content go here */}
          <CustomButton text="Filter" onPress={onPress} />
          <CustomButton text="Close" type="Tertiary" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    width: "90%", // Adjust the width as needed
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  txt: {
    fontSize: 16,
  },
  pickerCont: {
    flex: 1,
    borderColor: "#8F00FF",
    borderWidth: 1,
    borderRadius: 25,
  },
});

export default DormitoryModal;
