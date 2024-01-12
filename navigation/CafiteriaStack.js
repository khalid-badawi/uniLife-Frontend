import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CafiteriaHome from "../screens/CafiteriaHome";
import RestaurantScreen from "../screens/RestaurantScreen";
import CheckOut from "../screens/CheckOut";
import { Header } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "./CustomHeader";
import MyOrders from "../screens/MyOrders";
const Stack = createNativeStackNavigator();

const CafiteriaStack = () => {
  return (
    <Stack.Navigator initialRouteName="CafiteriaScreen">
      <Stack.Screen
        name="CafiteriaScreen"
        component={CafiteriaHome}
        options={{
          header: () => <CustomHeader title="Cafeteria" type="drawer" />,
        }}
      />
      <Stack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{
          header: () => <CustomHeader title="Restaurant" type="stack" />,
        }}
      />
      <Stack.Screen
        name="CheckOut"
        component={CheckOut}
        options={{
          header: () => <CustomHeader title="Check Out" type="stack" />,
        }}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          header: () => <CustomHeader title="My Orders" type="stack" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default CafiteriaStack;
