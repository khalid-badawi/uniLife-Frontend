import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyChats from "../screens/MyChats";

import EditProfileScreen from "../screens/EditProfile";
import CustomHeader from "./CustomHeader";
const Stack = createNativeStackNavigator();

const ScheduleStack = ({ route: { params } }) => {
  return (
    <Stack.Navigator initialRouteName="Edit Profile" screenOptions={{}}>
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          header: () => <CustomHeader title="Edit Profile" type="drawer" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ScheduleStack;
