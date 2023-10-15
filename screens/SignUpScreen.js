import React from "react";
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Button,
} from "react-native";
import Logo from "../assets/Logo2.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { Svg } from "react-native-svg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
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
  const { height, width } = useWindowDimensions();
  const handleSubmit = (values, { resetForm }) => {
    console.log("handleSubmit triggered");

    console.warn("hello");
    // Additional actions related to form submission can be added here

    // Reset the form after submission (optional)
    resetForm();
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
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
    >
      {({
        values,
        errors,

        handleSubmit,
        handleChange,
        setFieldTouched,
      }) => (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ ...styles.root, width: width }}
        >
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
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
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
