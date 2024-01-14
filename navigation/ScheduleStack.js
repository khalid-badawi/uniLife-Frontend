import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleScreen from "../screens/ScheduleScreen";
import AddScheduleScreen from "../screens/AddScheduleScreen";

import IndoorQR from "../screens/IndoorQR";
import CustomHeader from "./CustomHeader";
import EditScheduleScreen from "../screens/EditSchedule";
const Stack = createNativeStackNavigator();

const ScheduleStack = () => {
  return (
    <Stack.Navigator initialRouteName="My Schedule" screenOptions={{}}>
      <Stack.Screen
        name="My Schedule"
        component={ScheduleScreen}
        options={{
          header: () => <CustomHeader title="My Schedule" type="drawer" />,
        }}
      />
      <Stack.Screen
        name="Add Schedule"
        component={AddScheduleScreen}
        options={{
          header: () => <CustomHeader title="Add Lecture" />,
        }}
      />
      <Stack.Screen
        name="EditSchedule"
        component={EditScheduleScreen}
        options={{
          header: () => <CustomHeader title="Edit Lecture" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ScheduleStack;
