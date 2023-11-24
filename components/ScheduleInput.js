import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Logo from "../assets/Logo2.png";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import DaysSelection from "./DaysSelection";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useUser } from "../Contexts/UserContext";
import axios from "axios";
import { Alert } from "react-native";
import * as Keychain from "react-native-keychain";

const addLec = Yup.object().shape({});

const ScheduleInput = () => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [textStartTime, setTextStartTime] = useState("");
  const [endTime, setEndTime] = useState(new Date());
  const [textEndTime, setTextEndTime] = useState("");
  const [day, setDay] = useState("sunday");
  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { height, width } = useWindowDimensions();
  const { userId, setUserId } = useUser();

  useEffect({}, []);
  const getTokenFromKeychain = async () => {
    try {
      // Retrieve the token from the keychain
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const token = credentials.password;
        console.log("Token retrieved successfully:", token);
        return token;
      } else {
        console.log("No token found in the keychain");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday",
  ];

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };
  const onChangeStart = ({ type }, selectedTime) => {
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
  const onChangeEnd = ({ type }, selectedTime) => {
    if (type == "set") {
      const currentTime = selectedTime;
      setEndTime(currentTime);
      if (Platform.OS === "android") {
        toggleTimePicker();
        setTextEndTime(currentTime.toLocaleTimeString());
      }
    } else {
      toggleTimePicker();
    }
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  //states
  const handleAdd = async (values, { resetForm }) => {
    const val = {
      lectureId: 555,
      classNumber: values.classNum,
      Name: values.subject,
      startTime: textStartTime,
      endTime: textEndTime,
      day: selectedDays,
    };
    try {
      const token = await getTokenFromKeychain();
      const response = await axios.post(
        `http://10.0.2.2:3000/api/v1/unilife/addLecture/${userId}`,
        JSON.stringify(val),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //setErrorMsg("");

      console.log("gg");
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

    // resetForm();
    // setSelectedDays([]);
    //navigation.navigate("");
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
                onChange={onChangeStart}
              />
            )}
            <Pressable onPress={toggleTimePicker}>
              <CustomInput
                placeholder="Start Time"
                value={textStartTime}
                setValue={setTextStartTime}
                secureTextEntry={false}
                editable={false}
              />
            </Pressable>
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(200).duration(1000).springify()}
          >
            {showTimePicker && (
              <DateTimePicker
                mode="time"
                display="spinner"
                value={endTime}
                onChange={onChangeEnd}
              />
            )}
            <Pressable onPress={toggleTimePicker}>
              <CustomInput
                placeholder="End Time"
                value={textEndTime}
                setValue={setTextEndTime}
                secureTextEntry={false}
                editable={false}
              />
            </Pressable>
          </Animated.View>

          {/*<Picker selectedValue={day} onValueChange={handleDayChange}>
              {daysOfWeek.map((day, index) => (
                <Picker.Item key={index} label={day} value={day} />
              ))}
              </Picker>*/}
          <DaysSelection toggleDay={toggleDay} selectedDays={selectedDays} />

          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <CustomButton text="Add" onPress={handleSubmit} />
          </Animated.View>
          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <CustomButton
              text="My Schedule"
              onPress={() => navigation.navigate("Schedule")}
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
    marginTop: 30,
    backgroundColor: "white",
  },

  logo: {
    borderRadius: 3,
    marginBottom: 10,
  },
  animInput: {
    width: "100%",
  },
  animInputList: {
    width: "100%",
    borderColor: "#8F00FF",
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 15,
  },
  text: { color: "black", fontSize: 40, marginBottom: 20, marginTop: 40 },
});

export default ScheduleInput;
