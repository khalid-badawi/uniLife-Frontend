import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  useWindowDimensions,
  Pressable,
} from "react-native";
import Logo from "../assets/Logo2.png";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const addLec = Yup.object().shape({
  email: Yup.string()
    .required("❌ Please enter your email")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "❌ invalid email"
    ),
  password: Yup.string().required("❌ Please enter your password"),
});

const onForgotPasswordPressed = () => {
  console.warn("forgot password");
};
const onSignUpPressed = () => {
  console.warn("SignUp");
};

const ScheduleInput = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [textStartTime, setTextStartTime] = useState("");
  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };
  const onChange = ({ type }, selectedTime) => {
    if (type == "set") {
      const currentTime = selectedTime;
      setStartTime(currentTime);
      if (Platform.OS === "android") {
        toggleTimePicker();
        setTextStartTime(currentTime.toLocaleTimeString());
      }
    } else {
      toggleTimePicker();
    }
  };

  const { height, width } = useWindowDimensions();

  //states
  const handleAdd = (values, { resetForm }) => {
    console.warn(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        subject: "",
        classNum: "",
      }}
      onSubmit={handleAdd}
      validationSchema={addLec}
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
            entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          >
            <Text style={styles.text}>Add a lecture</Text>
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.duration(200).springify()}
          >
            <CustomInput
              placeholder="Subject"
              value={values.subject}
              setValue={handleChange("subject")}
              secureTextEntry={false}
              errors={errors.subject}
              onBlur={() => setFieldTouched("subject")}
            />
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(200).duration(1000).springify()}
          >
            <CustomInput
              placeholder="Class Number"
              value={values.classNum}
              setValue={handleChange("classNum")}
              errors={errors.classNum}
              onBlur={() => setFieldTouched("classNum")}
            />
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(200).duration(1000).springify()}
          >
            {showTimePicker && (
              <DateTimePicker
                mode="time"
                display="spinner"
                value={startTime}
                onChange={onChange}
              />
            )}
            <Pressable onPress={toggleTimePicker}>
              <CustomInput
                placeholder="StartTime"
                value={textStartTime}
                setValue={setTextStartTime}
                secureTextEntry={false}
                editable={false}
              />
            </Pressable>
          </Animated.View>

          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <CustomButton text="Add" onPress={handleSubmit} />
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <CustomButton
              text="My Schedule"
              onPress={() => {}}
              type="Tertiary"
            />
          </Animated.View>
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
    borderRadius: 3,
    marginBottom: 10,
  },
  animInput: {
    width: "100%",
  },

  text: { color: "#8F00FF", fontSize: 40, marginBottom: 20, marginTop: 40 },
});

export default ScheduleInput;
