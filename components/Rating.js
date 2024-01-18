import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import CustomButton from "./CustomButton";

const Star = ({ selected, onPress, disabled }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <Icon name={selected ? "star" : "staro"} size={30} color="#8F00FF" />
  </TouchableOpacity>
);

const Rating = ({
  rating,
  setRating,
  onConfirm,
  onCancel,
  ratingNotes,
  setRatingNotes,
  disabled,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleStarPress = (starIndex) => {
    setRating(starIndex);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    await onConfirm();
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Handle the cancel logic, if needed
    // ...
    setRating(0);
    setModalVisible(false);
  };

  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          selected={index <= rating}
          onPress={() => handleStarPress(index)}
          disabled={disabled}
        />
      ))}
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
            }}
          >
            <Text
              style={{ fontSize: 18, marginBottom: 10, alignSelf: "center" }}
            >
              Thanks for the feedback
            </Text>
            <TextInput
              multiline
              numberOfLines={10}
              placeholder="Describe your experience..."
              value={ratingNotes}
              onChangeText={(text) => setRatingNotes(text)}
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

export default Rating;
