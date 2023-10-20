import React, { useState } from "react";
import { View, Text, Button, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
const TimeInput = () => {
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };
  const onChange = ({ type }, selectedTime) => {
    if (type == "set") {
      const currentTime = selectedTime;
      setTime(currentTime);
      if (Platform.OS === "android") {
        toggleTimePicker();
        setTime(currentTime.toLocaleTimeString());
      }
    } else {
      toggleTimePicker();
    }
  };

  return (
    <View>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          disabled="default"
          value={time}
          onChange={onChange}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({});
export default TimeInput;
