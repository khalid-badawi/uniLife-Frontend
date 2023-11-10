import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPassword";
import ConfirmCodeScreen from "../screens/ConfirmCodeScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapScreen from "../screens/MapScreen";
import AddScheduleScreen from "../screens/AddScheduleScreen";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { Header } from "react-native-elements";
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="back" size={25} />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPW" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPW" component={ResetPasswordScreen} />
        <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{ headerTitle: "My Schedule" }}
        />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ScheduleInput" component={AddScheduleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
