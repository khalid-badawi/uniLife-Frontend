import { View, Text } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";

const DaysInput = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        title="Saturday"
        checked={selectedDays.includes("Saturday")}
        onPress={() => toggleDay("Saturday")}
      />
      <CheckBox
        title="Sunday"
        checked={selectedDays.includes("Sunday")}
        onPress={() => toggleDay("Sunday")}
      />
      <CheckBox
        title="Monday"
        checked={selectedDays.includes("Monday")}
        onPress={() => toggleDay("Monday")}
      />

      <CheckBox
        title="Tuesday"
        checked={selectedDays.includes("Tuesday")}
        onPress={() => toggleDay("Tuesday")}
      />
      <CheckBox
        title="Wednesday"
        checked={selectedDays.includes("Wednesday")}
        onPress={() => toggleDay("Wednesday")}
      />

      <CheckBox
        title="Thursday"
        checked={selectedDays.includes("Thursday")}
        onPress={() => toggleDay("Thursday")}
      />
    </View>
  );
};

export default DaysInput;
