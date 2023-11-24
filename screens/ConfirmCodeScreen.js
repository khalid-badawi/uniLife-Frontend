import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Logo from "../assets/Logo2.png";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const validate = Yup.object().shape({
  verifyCode: Yup.string().required(
    "❌ Please Enter the code you have received"
  ),
});

const onResendPressed = () => {
  console.warn("ok");
};
const ConfirmCodeScreen = ({ code = "0597401453" }) => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const handleConfirm = async (values, { resetForm }) => {
    console.warn(values);
    try {
      const response = await axios.post(
        "http://10.0.2.2:3000/api/v1/unilife/verify",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      resetForm();
      navigation.navigate("SignIn");
    } catch (error) {
      console.error(error.response);
    }
  };
  return (
    <Formik
      initialValues={{ verifyCode: "" }}
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
          <View style={styles.logoCont}>
            <Image
              source={Logo}
              style={{ ...styles.logo, height: height * 0.4, width: width }} // Fixed style object
              resizeMode="contain"
            />
          </View>
          <Text style={styles.descText}>
            We have sent a confirmation code to
            <Text style={{ ...styles.descText, fontWeight: "bold" }}>
              {" "}
              {code}{" "}
            </Text>
            check your inbox please
          </Text>
          <View style={styles.animInput}>
            <CustomInput
              placeholder="Verification Code"
              value={values.code}
              setValue={handleChange("verifyCode")}
              secureTextEntry={true}
              errors={errors.code}
              iconName={"key"}
              onBlur={() => setFieldTouched("verifyCode")}
            />
          </View>
          <View style={styles.animInput}>
            <CustomButton text="Verify" onPress={handleSubmit} />
          </View>
          <View style={styles.animInput}>
            <CustomButton
              text="Didn't recieve a code? Send again!"
              onPress={onResendPressed}
              type="Tertiary"
            />
          </View>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  logoCont: {
    alignItems: "center",
  },
  logo: {
    marginBottom: 20,
  },
  animInput: {
    width: "100%",
  },
  descText: {
    color: "black",
    paddingLeft: 10,
    fontSize: 17,
    marginVertical: 10,
  },
});
export default ConfirmCodeScreen;
