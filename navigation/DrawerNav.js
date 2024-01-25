import React, { useEffect, useRef, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, TextInput, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/Entypo";
import Icon4 from "react-native-vector-icons/Ionicons";
import MyChats from "../screens/MyChats";
import TabNav from "./TabNav";
import EditProfileScreen from "../screens/EditProfile";
import ChatScreen from "../screens/ChatScreen";
import CustomHeader from "./CustomHeader";
import ScheduleScreen from "../screens/ScheduleScreen";
import MyOrders from "../screens/MyOrders";
import LogOut from "../screens/LogOut";
import MyPostsScreen from "../screens/MyPostsScreen";
import ScheduleStack from "./ScheduleStack";
import EditProfileStack from "./EditProfileStack";
import ChatStack from "./ChatStack";
import SavedDorms from "../screens/SavedDorms";
import MyDormitoriesStack from "./MyDormitoriesStack";
import OthersPosts from "../screens/OthersPosts";
import NotificationScreen from "../screens/NotificationScreen";
import MyPostsStack from "./MyPostsStack";
import StickyAd from "../components/StickyAd";
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import BASE_URL from "../BaseUrl";
import { useUser } from "../Contexts/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import { useDrawer } from "../Contexts/openContext";
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const { userId } = useUser();

  const getNotificationCount = async () => {
    try {
      // Fetch the notification count only when the drawer is open

      console.log("GGZZZ");
      const token = await getTokenFromKeychain();
      const response = await axios.get(
        `${BASE_URL}/notificationcount/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle the response data here, for example:
      const result = response.data;
      setNotificationCount(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotificationCount();
  }, []);
  return (
    <View style={{ flex: 1 }}>
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
          component={EditProfileStack}
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
          component={ChatStack}
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
          name="Schedule"
          component={ScheduleStack}
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
          name="SavedDormsStack"
          component={MyDormitoriesStack}
          options={({ route }) => ({
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                name="home-city-outline"
                size={size}
                color={focused ? "white" : "#808080"}
              />
            ),
            drawerLabel: "Saved Dormitories",
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
            headerShown: "true",
            header: () => <CustomHeader title="My Orders" type="drawer" />,
          })}
        />
        <Drawer.Screen
          name="Notifications"
          component={NotificationScreen}
          options={({ route }) => ({
            drawerIcon: ({ focused, color, size }) => (
              <Icon4
                name="notifications-outline"
                size={size}
                color={focused ? "white" : "#808080"}
              />
            ),
            drawerLabel: "Notifications",
            headerShown: "true",
            header: () => <CustomHeader title="Notifications" type="drawer" />,
          })}
        />
        <Drawer.Screen
          name="MyPostsScreen"
          component={MyPostsStack}
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
    </View>
  );
};

export default React.memo(DrawerNav);
DrawerNav.displayName = "DrawerNav";
