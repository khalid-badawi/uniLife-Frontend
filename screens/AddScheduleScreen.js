import { View, Text } from "react-native";
import React from "react";
import ScheduleInput from "../components/ScheduleInput";
import BASE_URL from "../BaseUrl";
const AddScheduleScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScheduleInput />
    </View>
  );
};

export default AddScheduleScreen;
