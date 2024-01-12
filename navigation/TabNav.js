import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import MapStack from "./MapStack";
import CafiteriaStack from "./CafiteriaStack";
import DormitoryStack from "./DormitoryStack";
import ExchangeStack from "./ExchangeStack";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="MapTab"
      screenOptions={{
        headerShown: false,
        showLabel: true, // Hide the defshowLabel: true,
        tabBarActiveTintColor: "#8F00FF",

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
          tabBarLabel: "Cafiteria",
        }}
      />
      <Tab.Screen
        name="DormitoryStack"
        component={DormitoryStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="hotel" color={color} size={23} />
          ),
          tabBarLabel: "Dormitories",
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

export default TabNav;
