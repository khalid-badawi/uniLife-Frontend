import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
} from "react-native";
import Logo from "../assets/defaultProfile.jpg";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { Svg } from "react-native-svg";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  BounceInDown,
} from "react-native-reanimated";
import CustomPicker from "../components/CustomPicker";
import PickImageSmall from "../components/PickImageSmall";
import BASE_URL from "../BaseUrl";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useUser } from "../Contexts/UserContext";
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "❌ Too Short!")
    .max(25, "❌ Too Long!")
    .required("❌ please enter a username"),

  phoneNum: Yup.string()
    .required("❌ Please enter your phone number")
    .matches(/^[0-9]+$/, "❌ Use digits only")
    .min(10, "❌ Must be exactly 10 digits")
    .max(10, "❌ Must be exactly 10 digits"),
  major: Yup.string().required("❌Please Choose your major"),
});

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  console.log(image);
  const { userId } = useUser();
  const handleEditPress = async (values) => {
    // Validate postText, relatedMajors, and image

    try {
      const token = await getTokenFromKeychain();

      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      console.log("image", image);
      if (image && image.uri) {
        formData.append("image", {
          uri: image.uri,
          type: "image/jpeg",
          name: "image.jpeg",
        });
        setImageUrl(image.uri);
        setImage(null);
      }

      console.log("form:", formData);
      console.log(values);
      console.log("data", formData);

      const response = await axios.patch(
        `${BASE_URL}/profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phoneNum: "",
      major: "",
    },
    onSubmit: async (values) => {
      await handleEditPress(values);
    },
    validationSchema: SignupSchema,
  });

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        console.log("hi", userId);

        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/profile/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = response.data;
        const { username, phoneNum, major, image, email } = result;
        formik.setFieldValue("username", username);
        formik.setFieldValue("phoneNum", phoneNum);
        formik.setFieldValue("major", major);
        formik.setFieldValue("email", email);
        setImageUrl(image);

        console.log(result);
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
    getProfileInfo();
  }, []);
  let source;

  if (!image && !imageUrl) {
    source = Logo;
  } else if (image) {
    source = { uri: image.uri };
  } else if (imageUrl) {
    source = { uri: imageUrl };
  } else {
    source = Logo;
  }
  return (
    <KeyboardAvoidingView
      style={{ ...styles.root, width: width }}
      behavior="padding"
      keyboardVerticalOffset={Platform.select({
        ios: () => 0,
        android: () => -300,
      })()}
    >
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ ...styles.container, width: width, height: height }}>
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(1000)
              .springify()
              .damping(3)}
          >
            <Image source={source} alt="Profile Image" style={styles.logo} />
            <View style={{ position: "absolute", bottom: 40, right: 20 }}>
              <PickImageSmall
                image={image}
                setImage={setImage}
                iconName="edit"
              />
            </View>
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(50).duration(1000).springify()}
          >
            <CustomInput
              placeholder="Username"
              value={formik.values.username}
              setValue={formik.handleChange("username")}
              secureTextEntry={false}
              iconName={"user"}
              errors={formik.errors.username}
              onBlur={() => formik.setFieldTouched("username")}
            />
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(50).duration(1000).springify()}
          >
            <CustomInput
              placeholder="Email"
              value={formik.values.email}
              setValue={formik.handleChange("email")}
              secureTextEntry={false}
              iconName={"mail"}
              errors={formik.errors.email}
              onBlur={() => formik.setFieldTouched("email")}
              editable={false}
            />
          </Animated.View>

          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(100).duration(1000).springify()}
          >
            <CustomInput
              placeholder="Phone Number"
              value={formik.values.phoneNum}
              setValue={formik.handleChange("phoneNum")}
              secureTextEntry={false}
              errors={formik.errors.phoneNum}
              iconName={"phone"}
              keyboardType="phone-pad"
              onBlur={() => formik.setFieldTouched("phoneNum")}
            />
          </Animated.View>
          <Animated.View
            style={{ ...styles.animInput, flexDirection: "row" }}
            entering={FadeInDown.delay(150).duration(1000).springify()}
          >
            <CustomPicker
              value={formik.values.major}
              errors={formik.errors.major}
              onValueChange={formik.handleChange("major")}
            />
          </Animated.View>
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(250).duration(1000).springify()}
          >
            <CustomButton
              text="Edit"
              onPress={formik.handleSubmit}
              type="Primary"
            />
          </Animated.View>
          {errorMsg && <Text style={styles.errorText}>❌ {errorMsg}</Text>}
          <Animated.View
            style={styles.animInput}
            entering={FadeInDown.delay(300).duration(1000).springify()}
          >
            <CustomButton
              text="Change Password"
              type="Tertiary"
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 0,

    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: 20,
    alignItems: "center",
  },

  logo: {
    height: 230,
    width: 230,

    borderRadius: 115,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: "#8F00FF",
    marginBottom: 20,
  },
  animInput: {
    width: "100%",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 15,
  },
});

export default EditProfileScreen;
