import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";
import { Picker } from "@react-native-picker/picker";
const majors = ["All", "Most Relevant"];
const Catigory = ["All", "Books", "Equipments"];
const FilterModal = ({
  visible,
  closeModal,
  major,
  handleMajorChange,
  catigory,
  setCatigory,
}) => {
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
            <Text style={styles.txt}>Get Posts: </Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={major}
                onValueChange={(itemValue, itemIndex) =>
                  handleMajorChange(itemValue)
                }
              >
                {majors.map((major, index) => (
                  <Picker.Item key={index} label={major} value={major} />
                ))}
              </Picker>
            </View>
          </View>
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.txt}>Catigory{":   "}</Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={catigory}
                onValueChange={(itemValue, itemIndex) => setCatigory(itemValue)}
              >
                {Catigory.map((catigory, index) => (
                  <Picker.Item key={index} label={catigory} value={catigory} />
                ))}
              </Picker>
            </View>
          </View>
          {/* Your filter options and content go here */}
          <CustomButton text="Filter" onPress={closeModal} />
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

export default FilterModal;
