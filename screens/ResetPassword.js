import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import Logo from "../assets/Logo2.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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

  //states
  const handleReset = (values, { resetForm }) => {
    console.warn(values);
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
    color: "#643b66",
  },
});

export default ForgotPasswordScreen;
