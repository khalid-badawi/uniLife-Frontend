import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsMainScreen from "../screens/PostsMainScreen";
import MyPostsScreen from "../screens/MyPostsScreen";
import ChatScreen from "../screens/ChatScreen";
import CreatePost from "../screens/CreatePost";
import CustomHeader from "./CustomHeader";
import OthersPosts from "../screens/OthersPosts";
const Stack = createNativeStackNavigator();

const ExchangeStack = () => {
  return (
    <Stack.Navigator initialRouteName="PostsMain">
      <Stack.Screen
        name="PostsMain"
        component={PostsMainScreen}
        options={{
          header: () => (
            <CustomHeader title="Posts" type="drawer" search={true} />
          ),
        }}
      />

      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          header: () => <CustomHeader title="Cafeteria" type="stack" />,
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OthersPosts"
        component={OthersPosts}
        options={{
          header: () => <CustomHeader title="Profile" type="stack" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ExchangeStack;
