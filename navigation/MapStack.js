import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "../screens/MapScreen";
import IndoorQR from "../screens/IndoorQR";
import CustomHeader from "./CustomHeader";
const Stack = createNativeStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator initialRouteName="MapScreen" screenOptions={{}}>
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          header: () => <CustomHeader title="Cafeteria" type="drawer" />,
        }}
      />
      <Stack.Screen
        name="IndoorQR"
        component={IndoorQR}
        options={{
          header: () => <CustomHeader title="Indoor QR Guidance" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MapStack;
