import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({ value, onValueChange, errors, items }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pickerCont}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
        >
          <Picker.Item label="Choose Major" value={null} enabled={false} />
          {items.map((major, index) => (
            <Picker.Item key={index} label={major} value={major} />
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
