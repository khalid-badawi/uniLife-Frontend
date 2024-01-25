import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPassword";
import ConfirmCodeScreen from "../screens/ConfirmCodeScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import MapScreen from "../screens/MapScreen";
import AddScheduleScreen from "../screens/AddScheduleScreen";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header } from "react-native-elements";
import IndoorQR from "../screens/IndoorQR";
import CafiteriaHome from "../screens/CafiteriaHome";
import RestaurantScreen from "../screens/RestaurantScreen";
import CheckOut from "../screens/CheckOut";
import MyOrders from "../screens/MyOrders";
import CreatePost from "../screens/CreatePost";
import PostsMainScreen from "../screens/PostsMainScreen";
import ChatScreen from "../screens/ChatScreen";
import MyChats from "../screens/MyChats";
import MyPostsScreen from "../screens/MyPostsScreen";
import DormitoryScreen from "../screens/DormitoryScreen";
import { useTheme } from "@react-navigation/native";
import Animated, { Easing, withSpring } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import SearchIcon from "react-native-vector-icons/AntDesign";
import { Text, View, TextInput } from "react-native";
import DrawerNav from "./DrawerNav";
import OthersPosts from "../screens/OthersPosts";
import RoomsScreen from "../screens/RoomsScreen";
import StickyAd from "../components/StickyAd";
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Test"
        screenOptions={({ navigation }) => ({
          headerShown: false,
          headerTitleAlign: "center",
        })}
      >
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={DrawerNav} />
        <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
