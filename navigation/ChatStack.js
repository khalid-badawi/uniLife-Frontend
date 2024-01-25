import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyChats from "../screens/MyChats";

import ChatScreen from "../screens/ChatScreen";
import CustomHeader from "./CustomHeader";
import { useDrawer } from "../Contexts/openContext";
import { useDrawerStatus } from "@react-navigation/drawer";
const Stack = createNativeStackNavigator();

const ChatStack = ({ route: { params } }) => {
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
        options={{
          headerShown: true,
          header: () => <CustomHeader title="Chat" type="stack" />,
        }}
        initialParams={params}
      />
    </Stack.Navigator>
  );
};

export default React.memo(ChatStack);
ChatStack.displayName = "ChatStack";
