import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import Logo from "../assets/Logo2.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AlignLeft } from "react-native-feather";
import axios from "axios";
import BASE_URL from "../BaseUrl";
import { useNavigation } from "@react-navigation/native";

const validate = Yup.object().shape({
  email: Yup.string()
    .required("❌ Please enter your email")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "❌ invalid email"
    ),
});

const ForgotPasswordScreen = () => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const sendEmail = async (values) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/forgetPassword`,
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle the response data here, for example:
      navigation.navigate("ConfirmCode");
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
  const handleConfirm = async (values, { resetForm }) => {
    await sendEmail(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={handleConfirm}
      validationSchema={validate}
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
          <Image
            source={Logo}
            style={{ ...styles.logo, height: height * 0.4, width: width }} // Fixed style object
            resizeMode="contain"
          />
          <Text style={styles.mainText}>Forgot Password?</Text>

          <Text style={styles.descText}>Let's Reset Your Password Now</Text>

          <View style={styles.animInput}>
            <CustomInput
              placeholder="Email"
              value={values.email}
              setValue={handleChange("email")}
              secureTextEntry={false}
              errors={errors.email}
              iconName={"mail"}
              onBlur={() => setFieldTouched("email")}
            />
          </View>
          <View style={styles.animInput}>
            <CustomButton text="Confirm" onPress={handleSubmit} />
          </View>
          <View style={styles.animInput}>
            <CustomButton
              text="Go back"
              type="Tertiary"
              onPress={() => navigation.goBack()}
            />
          </View>
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
  mainText: {
    alignItems: "center",
    fontSize: 25,

    fontWeight: "bold",
    color: "#8F00FF",
  },
  descText: {
    color: "#8F00FF",
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
