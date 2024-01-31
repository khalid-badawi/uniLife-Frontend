import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Logo from "../assets/Logo2.png";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../BaseUrl";
const validate = Yup.object().shape({
  verifyCode: Yup.string().required(
    "❌ Please Enter the code you have received"
  ),
});

const onResendPressed = () => {
  console.warn("ok");
};
const ConfirmSignUp = ({ code = "0597401453" }) => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const handleConfirm = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/verify`,
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
      Alert.alert("Error", "Wrong Code");
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
            We have sent a verification code to your Email
          </Text>
          <View style={styles.animInput}>
            <CustomInput
              placeholder="Verification Code"
              value={values.code}
              setValue={handleChange("verifyCode")}
              secureTextEntry={false}
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

export default React.memo(ConfirmSignUp);
ConfirmSignUp.displayName = "ConfirmSignUp";
