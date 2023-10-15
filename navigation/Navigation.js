import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPassword";
import ConfirmCodeScreen from "../screens/ConfirmCodeScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ConfirmCode"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPW" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPW" component={ResetPasswordScreen} />
        <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
