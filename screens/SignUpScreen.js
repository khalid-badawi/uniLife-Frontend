import React from "react";
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Logo from "../assets/Logo2.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { Svg } from "react-native-svg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  BounceInDown,
} from "react-native-reanimated";
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "❌ Too Short!")
    .max(25, "❌ Too Long!")
    .required("❌ please enter a username"),
  email: Yup.string()
    .required("❌ Please enter your email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@stu\.najah\.edu$/,
      "❌ You must use a Najah student email"
    ),
  password: Yup.string()
    .min(8, "❌ Password should contain at least 8 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/,
      "Must contain minimum 8 characters, at least one uppercase, at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("❌ Please enter your password"),
  confirmPassword: Yup.string()
    .required("❌ Please confirm your password")
    .min(8, "❌ Password should contain at least 8 characters")
    .oneOf([Yup.ref("password")], "❌ Your passwords do not match"),
  phoneNum: Yup.string()
    .required("❌ Please enter your phone number")
    .matches(/^[0-9]+$/, "❌ Use digits only")
    .min(10, "❌ Must be exactly 10 digits")
    .max(10, "❌ Must be exactly 10 digits"),
});

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:3000/api/v1/unilife/signup",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.status);
      navigation.navigate("ConfirmCode");
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNum: "",
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validationSchema={SignupSchema}
    >
      {({
        values,
        errors,

        handleSubmit,
        handleChange,
        setFieldTouched,
      }) => (
        <KeyboardAvoidingView
          style={{ ...styles.root, width: width }}
          behavior="padding"
          keyboardVerticalOffset={Platform.select({
            ios: () => 0,
            android: () => -300,
          })()}
        >
          <ScrollView
            style={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ ...styles.container, width: width, height: height }}>
              <Animated.View
                entering={FadeInDown.delay(200)
                  .duration(1000)
                  .springify()
                  .damping(3)}
              >
                <Image
                  source={Logo}
                  style={{ ...styles.logo, height: height * 0.3, width: width }} // Fixed style object
                  resizeMode="contain"
                />
              </Animated.View>
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(200).duration(1000).springify()}
              >
                <CustomInput
                  placeholder="Username"
                  value={values.username}
                  setValue={handleChange("username")}
                  secureTextEntry={false}
                  iconName={"user"}
                  errors={errors.username}
                  onBlur={() => setFieldTouched("username")}
                />
              </Animated.View>
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(400).duration(1000).springify()}
              >
                <CustomInput
                  placeholder="Email"
                  value={values.email}
                  setValue={handleChange("email")}
                  secureTextEntry={false}
                  errors={errors.email}
                  iconName={"mail"}
                  onBlur={() => setFieldTouched("email")}
                />
              </Animated.View>
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(600).duration(1000).springify()}
              >
                <CustomInput
                  placeholder="Password"
                  value={values.password}
                  setValue={handleChange("password")}
                  secureTextEntry={true}
                  errors={errors.password}
                  iconName={"key"}
                  onBlur={() => setFieldTouched("password")}
                />
              </Animated.View>
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(800).duration(1000).springify()}
              >
                <CustomInput
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  setValue={handleChange("confirmPassword")}
                  secureTextEntry={true}
                  errors={errors.confirmPassword}
                  iconName={"key"}
                  onBlur={() => setFieldTouched("confirmPassword")}
                />
              </Animated.View>

              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(1200).duration(1000).springify()}
              >
                <CustomInput
                  placeholder="Phone Number"
                  value={values.phoneNum}
                  setValue={handleChange("phoneNum")}
                  secureTextEntry={false}
                  errors={errors.phoneNum}
                  iconName={"phone"}
                  keyboardType="phone-pad"
                  onBlur={() => setFieldTouched("phoneNum")}
                />
              </Animated.View>
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(1200).duration(1000).springify()}
              >
                <CustomButton
                  text="Register"
                  onPress={handleSubmit}
                  type="Primary"
                />
              </Animated.View>
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(1200).duration(1000).springify()}
              >
                <CustomButton
                  text="Already have an account? Sign in"
                  type="Tertiary"
                />
              </Animated.View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 0,

    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: 20,
    alignItems: "center",
  },

  logo: {
    borderRadius: 3,
    marginBottom: 10,
  },
  animInput: {
    width: "100%",
  },
});

export default SignUpScreen;
