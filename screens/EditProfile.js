import React from "react";
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
import Logo from "../assets/defaultProfile.jpg";
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
import PickImageSmall from "../components/PickImageSmall";
import BASE_URL from "../BaseUrl";
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
  major: Yup.string().required("❌Please Choose your major"),
});

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState("");
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
      navigation.navigate("ConfirmCode");
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
                  style={styles.logo} // Fixed style object
                  resizeMode="contain"
                />
                <View style={{ position: "absolute", bottom: 40, right: 20 }}>
                  <PickImageSmall
                    image={image}
                    setImage={setImage}
                    iconName="edit"
                  />
                </View>
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
                entering={FadeInDown.delay(150).duration(1000).springify()}
              >
                <CustomPicker
                  value={values.major}
                  errors={errors.major}
                  onValueChange={handleChange("major")}
                />
              </Animated.View>
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(250).duration(1000).springify()}
              >
                <CustomButton
                  text="Edit"
                  onPress={handleSubmit}
                  type="Primary"
                />
              </Animated.View>
              {errorMsg && <Text style={styles.errorText}>❌ {errorMsg}</Text>}
              <Animated.View
                style={styles.animInput}
                entering={FadeInDown.delay(300).duration(1000).springify()}
              >
                <CustomButton
                  text="Change Password"
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
    height: 230,
    width: 230,

    borderRadius: 115,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: "#8F00FF",
    marginBottom: 20,
  },
  animInput: {
    width: "100%",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 15,
  },
});

export default EditProfileScreen;
