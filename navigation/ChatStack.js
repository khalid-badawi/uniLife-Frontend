import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyChats from "../screens/MyChats";

import ChatScreen from "../screens/ChatScreen";
import CustomHeader from "./CustomHeader";
const Stack = createNativeStackNavigator();

const ScheduleStack = ({ route: { params } }) => {
  return (
    <Stack.Navigator initialRouteName="My Chats" screenOptions={{}}>
      <Stack.Screen
        name="My Chats"
        component={MyChats}
        options={{
          header: () => <CustomHeader title="My Chats" type="drawer" />,
        }}
      />
      <Stack.Screen
        name="Chat Screen"
        component={ChatScreen}
        options={{ headerShown: false }}
        initialParams={params}
      />
    </Stack.Navigator>
  );
};

export default ScheduleStack;
