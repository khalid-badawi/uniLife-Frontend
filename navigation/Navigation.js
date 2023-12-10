import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
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
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainNav"
      screenOptions={{
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
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen name="MainNav" component={TabNav} />
      <Drawer.Screen
        name="ChatScreen"
        options={{
          drawerIcon: () => <Icon name="chat" size={20} color="white" />,
          drawerLabel: "Chats",
        }}
        component={MyChats}
      />
    </Drawer.Navigator>
  );
};

const MapStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MapScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="IndoorQR" component={IndoorQR} />
    </Stack.Navigator>
  );
};
const CafiteriaStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CafiteriaScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CafiteriaScreen" component={CafiteriaHome} />
      <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
    </Stack.Navigator>
  );
};
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
const ExchangeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PostsMain"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PostsMain" component={PostsMainScreen} />
      <Stack.Screen name="MyPosts" component={MyPostsScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="MapTab"
      screenOptions={{
        headerShown: false,
        showLabel: true, // Hide the defshowLabel: true,
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "#8F00FF",

        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 2,
        },
        tabBarStyle: {},
      }}
    >
      <Tab.Screen
        name="MapTab"
        component={MapStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="map-marker" color={color} size={23} />
          ),
          tabBarLabel: "Map",
        }}
      />
      <Tab.Screen
        name="CafiteriaTab"
        component={CafiteriaStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="food" color={color} size={23} />
          ),
          tabBarLabel: "Cafiteria", // Change label text
        }}
      />
      <Tab.Screen
        name="DormitoryStack"
        component={DormitoryStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="hotel" color={color} size={23} />
          ),
          tabBarLabel: "Dormitories", // Change label text
        }}
      />
      <Tab.Screen
        name="PostsStack"
        component={ExchangeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="exchange-alt" color={color} size={23} />
          ),
          tabBarLabel: "Exchange",
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
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
        {/* <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="ForgotPW" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPW" component={ResetPasswordScreen} />
        <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
        <Stack.Screen name="PostsMain" component={PostsMainScreen} />
        <Stack.Screen name="MyPosts" component={MyPostsScreen} />
        <Stack.Screen name="MyChats" component={MyChats} />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="IndoorQR" component={IndoorQR} />
        <Stack.Screen name="CafiteriaScreen" component={CafiteriaHome} />
        <Stack.Screen name="ScheduleInput" component={AddScheduleScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
