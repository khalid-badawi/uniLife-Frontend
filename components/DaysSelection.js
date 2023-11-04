import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { View } from "react-native";
import { ScrollView } from "react-native";

const DaysSelection = ({ toggleDay, selectedDays }) => {
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

  return (
    <ScrollView horizontal>
      {days.map((day, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <CheckBox
            title={day}
            checked={selectedDays.includes(day)}
            onPress={() => toggleDay(day)}
          />
        </View>
      ))}
    </ScrollView>
  );
};
export default DaysSelection;
