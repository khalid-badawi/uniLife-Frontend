import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
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
import CustomPicker from "../components/CustomPicker";
import BASE_URL from "../BaseUrl";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
const SignupSchema = Yup.object().shape({
  major: Yup.string().required("❌Please Choose your major"),
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
  const [errorMsg, setErrorMsg] = useState("");
  const [majors, setMajors] = useState([]);
  const { userId } = useUser();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(values);
      console.log(response.status);
      navigation.navigate("ConfirmSignUp");
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
  };
  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/major`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Hellooo");
        // Handle the response data here, for example:
        const result = response.data;

        console.log(result);
        const mappedArray = result.map((item) => item.name);
        setMajors(mappedArray);

        //setChat(response.data.data);
      } catch (error) {
        if (error.response) {
          Alert.alert("Error", error.response.data.message);
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
    };
    getMenu();
  }, []);
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNum: "",
        major: "",
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validationSchema={SignupSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        values,
        errors,

        handleSubmit,
        handleChange,
        setFieldTouched,
      }) => (
        <KeyboardAvoidingView
          style={{ ...styles.root, width: width, height: height }}
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
            <View style={{ ...styles.container, width: width, flex: 1 }}>
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
                entering={FadeInDown.delay(50).duration(1000).springify()}
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
                entering={FadeInDown.delay(100).duration(1000).springify()}
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
                entering={FadeInDown.delay(150).duration(1000).springify()}
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
                entering={FadeInDown.delay(200).duration(1000).springify()}
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
                entering={FadeInDown.delay(250).duration(1000).springify()}
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
                style={{ ...styles.animInput, flexDirection: "row" }}
                entering={FadeInDown.delay(250).duration(1000).springify()}
              >
                <CustomPicker
                  items={majors}
                  value={values.major}
                  errors={errors.major}
                  onValueChange={handleChange("major")}
                />
              </Animated.View>
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(300).duration(1000).springify()}
              >
                <CustomButton
                  text="Register"
                  onPress={handleSubmit}
                  type="Primary"
                />
              </Animated.View>
              {errorMsg && <Text style={styles.errorText}>❌ {errorMsg}</Text>}
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(350).duration(1000).springify()}
              >
                <CustomButton
                  text="Already have an account? Sign in"
                  type="Tertiary"
                  onPress={() => {
                    navigation.navigate("SignIn");
                  }}
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
  errorText: {
    color: "red",
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 15,
  },
});

export default SignUpScreen;
