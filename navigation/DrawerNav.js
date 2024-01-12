import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/Entypo";
import SearchIcon from "react-native-vector-icons/AntDesign";
import MyChats from "../screens/MyChats";
import TabNav from "./TabNav";
import EditProfileScreen from "../screens/EditProfile";
import ChatScreen from "../screens/ChatScreen";
import CustomHeader from "./CustomHeader";
import ScheduleScreen from "../screens/ScheduleScreen";
import MyOrders from "../screens/MyOrders";
import LogOut from "../screens/LogOut";
import MyPostsScreen from "../screens/MyPostsScreen";
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainNav"
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStyle: {
          backgroundColor: "#A100FF",
        },
        headerTintColor: "white",
        headerTitle: "uniLife",
        headerTitleStyle: {
          fontSize: 20,
        },
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: "#A100FF",
      })}
    >
      <Drawer.Screen name="MainNav" component={TabNav} />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="account"
              size={size}
              color={focused ? "white" : "#808080"}
            />
          ),
          drawerLabel: "Edit Profile",
        })}
      />
      <Drawer.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="chat"
              size={size}
              color={focused ? "white" : "#808080"}
            />
          ),
          drawerLabel: "Chats",
        })}
      />
      <Drawer.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => (
            <Icon2
              name="table"
              size={size}
              color={focused ? "white" : "#808080"}
            />
          ),
          drawerLabel: "My Schedule",
        })}
      />
      <Drawer.Screen
        name="MyOrders"
        component={MyOrders}
        options={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => (
            <Icon2
              name="shoppingcart"
              size={size}
              color={focused ? "white" : "#808080"}
            />
          ),
          drawerLabel: "My Orders",
        })}
      />
      <Drawer.Screen
        name="MyPosts"
        component={MyPostsScreen}
        options={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="card-text-outline"
              size={size}
              color={focused ? "white" : "#808080"}
            />
          ),
          drawerLabel: "My Posts",
        })}
      />
      <Drawer.Screen
        name="Logout"
        component={LogOut}
        options={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => (
            <Icon3
              name="log-out"
              size={size}
              color={focused ? "white" : "#808080"}
            />
          ),
          drawerLabel: "Logout",
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
