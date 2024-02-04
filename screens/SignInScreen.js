import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  Text,
  Alert,
} from "react-native";
import Logo from "../assets/Logo2.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../Contexts/UserContext";
import { useContext } from "react";
import messaging from "@react-native-firebase/messaging";
import BASE_URL from "../BaseUrl";
import BlockedScreen from "./BlockedScreen";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required("❌ Please enter your email")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "❌ invalid email"
    ),
  password: Yup.string().required("❌ Please enter your password"),
});
const requestFCMPermission = async () => {
  try {
    const permissionStatus = await messaging().requestPermission();
    if (permissionStatus) {
      const fcmToken = await messaging().getToken();
      console.log("fcmToken:", fcmToken);
      return fcmToken;
    }
  } catch (error) {
    console.error("Error requesting FCM permission:", error);
  }
};
const SignInScreen = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [errorMsg, setErrorMsg] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(true);
  const { userId, setUserId, setUsername } = useUser();
  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };
  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  const storeTokenInKeychain = async (token) => {
    try {
      // Store the token in the keychain
      await Keychain.setGenericPassword("myTokenKey", token);

      console.log("Token stored successfully");
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };
  const getTokenFromKeychain = async () => {
    try {
      // Retrieve the token from the keychain
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const token = credentials.password;
        console.log("Token retrieved successfully:", token);
        return token;
      } else {
        console.log("No token found in the keychain");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };
  const getUser = async () => {
    try {
      const token = await getTokenFromKeychain();
      console.log("gd", token);
      const response = await axios.get(`${BASE_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Hellooo");
      // Handle the response data here, for example:
      const result = response.data;
      console.log("result:", result);
      setUserId(result.id);
      setUsername(result.username);
      return true;
      //setChat(response.data.data);
    } catch (error) {
      console.log(error);
      setIsSignedIn(false);
      return false;
    }
  };
  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const storedToken = await getTokenFromKeychain();
      console.log("Aloo", storedToken);
      if (storedToken) {
        const res = await getUser();
        if (res) {
          navigation.navigate("Main");
        } else {
          setIsSignedIn(false);
        }
      } else {
        setIsSignedIn(false);
      }
    };

    checkTokenAndNavigate();
  }, []);

  //states
  const handleSignIn = async (values, { resetForm }) => {
    try {
      const fcmTok = await requestFCMPermission();

      const response = await axios.post(
        `${BASE_URL}/login`,
        JSON.stringify({ ...values, token: fcmTok }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.data.blocked) {
        navigation.navigate("BlockedScreen");
      } else {
        await storeTokenInKeychain(response.data.token);
        setErrorMsg("");
        requestFCMPermission();
        setUserId(response.data.data.id);
        setUsername(response.data.data.username);

        console.log(response.data.data);
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
        setIsSignedIn(false);
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else if (error.request) {
        Alert.alert(
          "Network Error",
          "There was a problem with the network. Please check your internet connection and try again.",
          [{ text: "OK" }]
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert(
          "Something Wrong",
          "Something went wrong, try again please",
          [{ text: "OK" }]
        );
      }
    }
    resetForm();
  };

  return (
    <>
      {!isSignedIn && (
        <Formik
          initialValues={{
            email: "s11923593@stu.najah.edu",
            password: "1234saiF@",
          }}
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
                entering={FadeInUp.delay(200)
                  .duration(1000)
                  .springify()
                  .damping(3)}
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
              {errorMsg && <Text style={styles.errorText}>❌ {errorMsg}</Text>}
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
      )}
    </>
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
  errorText: {
    color: "red",
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 15,
  },
});

export default SignInScreen;
