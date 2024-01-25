import { View, Text } from "react-native";
import React from "react";
import ScheduleInput from "../components/ScheduleInput";
import { LogBox } from "react-native";

import BASE_URL from "../BaseUrl";
import { useRoute } from "@react-navigation/native";
const AddScheduleScreen = () => {
  const route = useRoute();
  const { setRefreshTrigger } = route.params; // Accessing parameters passed through navigation

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScheduleInput setRefreshTrigger={setRefreshTrigger} />
    </View>
  );
};

export default React.memo(AddScheduleScreen);
AddScheduleScreen.displayName = "AddScheduleScreen";
