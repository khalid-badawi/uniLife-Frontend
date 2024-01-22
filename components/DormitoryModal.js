import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { Picker } from "@react-native-picker/picker";

const types = ["Any", "Standard", "Master", "Studio"];
const genders = ["Any", "Male", "Female"];

const distances = [
  { label: "Any", value: null },
  { label: "Less Than 1 km", value: 1 },
  { label: "Less Than 2 km", value: 2 },
  { label: "Less Than 3 km", value: 3 },
  { label: "Less Than 4 km", value: 4 },
  { label: "Less Than 5 km", value: 5 },
  // Add more distance options as needed
];
const orderPrice = [
  { label: "Descending", value: "DESC" },
  { label: "Ascending", value: "ASC" },

  // Add more distance options as needed
];

const prices = [
  { label: "Any", value: null },
  { label: "Less Than 200₪", value: 200 },
  { label: "Less Than 300₪", value: 300 },
  { label: "Less Than 400₪", value: 400 },
  { label: "Less Than 500₪", value: 500 },
];

const DormitoryModal = ({
  visible,
  closeModal,
  major,
  handleMajorChange,
  distance,
  setDistance,
  price,
  setPrice,
  type,
  setType,
  getPosts,
  gender,
  setGender,
  priceOrder,
  setPriceOrder,
  getData,
}) => {
  const onPress = async () => {
    await getData();
    closeModal();
    // getPosts();
  };
  console.log(distance, price);
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
            <Text style={styles.txt}>Gender:{"    "} </Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              >
                {genders.map((type, index) => (
                  <Picker.Item key={index} label={type} value={type} />
                ))}
              </Picker>
            </View>
          </View>
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.txt}>Distance:{"  "}</Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={distance}
                onValueChange={(itemValue, itemIndex) => setDistance(itemValue)}
              >
                {distances.map((distance, index) => (
                  <Picker.Item
                    key={index}
                    label={distance.label}
                    value={distance.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.txt}>Price:{"        "}</Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={price}
                onValueChange={(itemValue, itemIndex) => setPrice(itemValue)}
              >
                {prices.map((price, index) => (
                  <Picker.Item
                    key={index}
                    label={price.label}
                    value={price.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {/* Your filter options and content go here */}
          <View
            style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.txt}>Order Price: </Text>
            <View style={styles.pickerCont}>
              <Picker
                selectedValue={priceOrder}
                onValueChange={(itemValue, itemIndex) =>
                  setPriceOrder(itemValue)
                }
              >
                {orderPrice.map((price, index) => (
                  <Picker.Item
                    key={index}
                    label={price.label}
                    value={price.value}
                  />
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
    width: "95%", // Adjust the width as needed
    padding: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  txt: {
    fontSize: 16,
    width: "30%",
  },
  pickerCont: {
    flex: 1,
    borderColor: "#8F00FF",
    borderWidth: 1,
    borderRadius: 25,
  },
});

export default DormitoryModal;
