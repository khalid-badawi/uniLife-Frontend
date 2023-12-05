import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
const majors = ["Choose your Major", "CE", "Physics", "Chemics"];
const CustomPicker = ({ value, onValueChange, errors }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pickerCont}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
        >
          {majors.map((major, index) => (
            <Picker.Item
              key={index}
              label={major}
              value={major}
              enabled={index !== 0}
            />
          ))}
        </Picker>
      </View>
      {errors && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  pickerCont: {
    borderColor: "#8F00FF",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 15,
  },
});

export default CustomPicker;
