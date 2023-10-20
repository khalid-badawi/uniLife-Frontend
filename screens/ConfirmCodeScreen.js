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

const validate = Yup.object().shape({
  code: Yup.string().required("❌ Please Enter the code you have received"),
});

const handleConfirm = (values, { resetForm }) => {
  console.warn(values);
  resetForm();
};

const onResendPressed = () => {
  console.warn("ok");
};
const ConfirmCodeScreen = ({ code = "0597401453" }) => {
  const { height, width } = useWindowDimensions();
  return (
    <Formik
      initialValues={{ code: "" }}
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
              setValue={handleChange("code")}
              secureTextEntry={true}
              errors={errors.code}
              iconName={"key"}
              onBlur={() => setFieldTouched("code")}
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
    color: "#643b66",
    paddingLeft: 10,
    fontSize: 17,
    marginVertical: 10,
  },
});
export default ConfirmCodeScreen;
