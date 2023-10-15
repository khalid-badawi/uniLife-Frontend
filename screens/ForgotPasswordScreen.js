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
import { AlignLeft } from "react-native-feather";

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

  //states
  const handleConfirm = (values, { resetForm }) => {
    console.warn(values);
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

          <Text style={styles.descText}>
            Happens! Let's Reset Your Password Now
          </Text>

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
        </View>
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
  mainText: {
    alignItems: "center",
    fontSize: 25,

    fontWeight: "bold",
    color: "#643b66",
  },
  descText: {
    color: "#643b66",
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
