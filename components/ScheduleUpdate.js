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

const ScheduleUpdate = ({
  setRefreshTrigger,
  subject,
  classNum,
  time1,
  time2,
  days,
  id,
}) => {
  const [showTimePicker1, setshowTimePicker1] = useState(false);
  const [showTimePicker2, setshowTimePicker2] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [textStartTime, setTextStartTime] = useState(time1);
  const [endTime, setEndTime] = useState(new Date());
  const [textEndTime, setTextEndTime] = useState(time2);
  const [day, setDay] = useState("sunday");
  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState(days);
  const [errorMsg, setErrorMsg] = useState("");
  const { height, width } = useWindowDimensions();
  const { userId, setUserId } = useUser();

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

  const toggleTimePicker1 = () => {
    setshowTimePicker1(!showTimePicker1);
  };
  const toggleTimePicker2 = () => {
    setshowTimePicker2(!showTimePicker2);
  };
  const onChangeStart = ({ type }, selectedTime) => {
    if (type == "set") {
      const currentTime = selectedTime;
      currentTime.setSeconds(0);
      setStartTime(currentTime);
      if (Platform.OS === "android") {
        toggleTimePicker1();
        setTextStartTime(currentTime.toLocaleTimeString());
      }
    } else {
      toggleTimePicker1();
    }
  };
  const onChangeEnd = ({ type }, selectedTime) => {
    if (type == "set") {
      const currentTime = selectedTime;
      currentTime.setSeconds(0);
      setEndTime(currentTime);
      if (Platform.OS === "android") {
        toggleTimePicker2();
        setTextEndTime(currentTime.toLocaleTimeString());
      }
    } else {
      toggleTimePicker2();
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
      classNumber: values.classNum,
      Name: values.subject,
      startTime: textStartTime,
      endTime: textEndTime,
      day: selectedDays,
    };
    try {
      const token = await getTokenFromKeychain();
      const response = await axios.patch(
        `http://10.0.2.2:3000/api/v1/unilife/lecture/${userId}/${id}`,
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
      setRefreshTrigger((prev) => !prev);
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
        subject: subject,
        classNum: classNum,
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
            <Text style={styles.text}>Edit information below</Text>
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
              placeholder="Class Number eg.11G170"
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
            {showTimePicker1 && (
              <DateTimePicker
                mode="time"
                display="spinner"
                value={startTime}
                onChange={onChangeStart}
              />
            )}
            <Pressable onPress={toggleTimePicker1}>
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
            {showTimePicker2 && (
              <DateTimePicker
                mode="time"
                display="spinner"
                value={endTime}
                onChange={onChangeEnd}
              />
            )}
            <Pressable onPress={toggleTimePicker2}>
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
            <CustomButton text="Edit" onPress={handleSubmit} />
          </Animated.View>
          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <CustomButton
              text="My Schedule"
              onPress={() => navigation.navigate("My Schedule")}
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
  text: { color: "black", fontSize: 30, marginBottom: 20, marginTop: 40 },
});

export default ScheduleUpdate;
