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
import axios from "axios";
import BASE_URL from "../BaseUrl";
import { useNavigation } from "@react-navigation/native";

const validate = Yup.object().shape({
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
});

const ForgotPasswordScreen = () => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  //states
  const handleReset = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/resetPassword`,
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // resetForm();
      navigation.navigate("SignIn");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error setting new password");
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={handleReset}
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
          <Text style={styles.mainText}>Reset Password</Text>
          <View style={styles.animInput}>
            <CustomInput
              placeholder="Password"
              value={values.password}
              setValue={handleChange("password")}
              secureTextEntry={true}
              errors={errors.password}
              iconName={"key"}
              onBlur={() => setFieldTouched("password")}
            />
          </View>
          <View style={styles.animInput}>
            <CustomInput
              placeholder="Confirm Password"
              value={values.confirmPassword}
              setValue={handleChange("confirmPassword")}
              secureTextEntry={true}
              errors={errors.confirmPassword}
              iconName={"key"}
              onBlur={() => setFieldTouched("confirmPassword")}
            />
          </View>

          <View style={styles.animInput}>
            <CustomButton text="Reset" onPress={handleSubmit} />
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
    marginBottom: 10,
  },
  animInput: {
    width: "100%",
  },
  mainText: {
    alignItems: "center",
    fontSize: 25,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#8F00FF",
  },
});

export default ForgotPasswordScreen;
