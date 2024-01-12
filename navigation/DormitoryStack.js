// DormitoryStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DormitoryScreen from "../screens/DormitoryScreen";

const Stack = createNativeStackNavigator();

const DormitoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DormitoryScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DormitoryScreen" component={DormitoryScreen} />
    </Stack.Navigator>
  );
};

export default DormitoryStack;
