import { View, Text } from "react-native";
import React from "react";
import ScheduleInput from "../components/ScheduleInput";
import { LogBox } from "react-native";

import BASE_URL from "../BaseUrl";
import { useRoute } from "@react-navigation/native";
import ScheduleUpdate from "../components/ScheduleUpdate";
const EditScheduleScreen = ({}) => {
  const route = useRoute();
  const { setRefreshTrigger, id, subject, classNum, time1, time2, days } =
    route.params; // Accessing parameters passed through navigation

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScheduleUpdate
        setRefreshTrigger={setRefreshTrigger}
        subject={subject}
        classNum={classNum}
        time1={time1}
        time2={time2}
        days={days}
        id={id}
      />
    </View>
  );
};

export default React.memo(EditScheduleScreen);
EditScheduleScreen.displayName = "EditScheduleScreen";
