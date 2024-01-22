// DormitoryStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DormitoryScreen from "../screens/DormitoryScreen";
import CustomHeader from "./CustomHeader";
import RoomsScreen from "../screens/RoomsScreen";
import SavedDorms from "../screens/SavedDorms";

const Stack = createNativeStackNavigator();

const DormitoryStack = () => {
  return (
    <Stack.Navigator initialRouteName="DormitoryScreen" screenOptions={{}}>
      <Stack.Screen
        name="DormitoryScreen"
        component={DormitoryScreen}
        options={{
          header: () => <CustomHeader title="Dormitories" type="drawer" />,
        }}
      />
      <Stack.Screen
        name="RoomsScreen"
        component={RoomsScreen}
        options={{
          header: () => <CustomHeader title="Rooms" type="stack" />,
        }}
      />
      
    </Stack.Navigator>
  );
};

export default DormitoryStack;
