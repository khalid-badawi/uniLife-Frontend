import React from "react";
import { View, StyleSheet, Image, useWindowDimensions } from "react-native";
import Logo from "../assets/Logo2.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required("❌ Please enter your email")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "❌ invalid email"
    ),
  password: Yup.string().required("❌ Please enter your password"),
});

const SignInScreen = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  const onForgotPasswordPressed = () => {
    console.warn("forgot password");
  };
  const onSignUpPressed = () => {
    console.warn("SignUp");
    navigation.navigate("SignUp");
  };
  //states
  const handleSignIn = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:3000/api/v1/unilife/login",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      navigation.navigate("Schedule");
    } catch (error) {
      console.error(error.response);
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSignIn}
      validationSchema={SignInSchema}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldTouched,
        isValid,
      }) => (
        <View style={{ ...styles.root, width: width }}>
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          >
            <Image
              source={Logo}
              style={{ ...styles.logo, height: height * 0.4, width: width }} // Fixed style object
              resizeMode="contain"
            />
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.duration(200).springify()}
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
            entering={FadeInDown.delay(200).duration(1000).springify()}
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
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <CustomButton text="Sign In" onPress={handleSubmit} />
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <CustomButton
              text="Forgot password?"
              onPress={onForgotPasswordPressed}
              type="Tertiary"
            />
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(800).duration(1000).springify()}
          >
            <CustomButton
              text="Not registered yet? Sign Up Now!"
              onPress={onSignUpPressed}
              type="Tertiary"
            />
          </Animated.View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },

  logo: {
    borderRadius: 3,
    marginBottom: 10,
  },
  animInput: {
    width: "100%",
  },
});

export default SignInScreen;
