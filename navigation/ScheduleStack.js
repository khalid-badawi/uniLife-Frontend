import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleScreen from "../screens/ScheduleScreen";
import AddScheduleScreen from "../screens/AddScheduleScreen";

import IndoorQR from "../screens/IndoorQR";
import CustomHeader from "./CustomHeader";
import EditScheduleScreen from "../screens/EditSchedule";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../Contexts/UserContext";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import BASE_URL from "../BaseUrl";
import axios from "axios";
import StickyAd from "../components/StickyAd";
import { useDrawer } from "../Contexts/openContext";
import { useDrawerStatus } from "@react-navigation/drawer";
const Stack = createNativeStackNavigator();

const ScheduleStack = () => {
  const navigation = useNavigation();
  const [ad, setAd] = useState(null);
  const { userId } = useUser();

  const fetchNewAd = async () => {
    try {
      const token = await getTokenFromKeychain();
      const response = await axios.get(`${BASE_URL}/adds/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Helloooz");
      // Handle the response data here, for example:
      const result = response.data;
      console.log(result);

      return result[0];
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
  useEffect(() => {
    let isMounted = true;

    const fetchAd = async () => {
      try {
        const adData = await fetchNewAd();

        if (isMounted) {
          setAd(adData);
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };

    const adTimer = setInterval(() => {
      // Fetch a new ad every 30 seconds if the component is focused
      if (navigation.isFocused()) {
        fetchAd();
      }
    }, 30000);

    // Initial fetch
    fetchAd();

    return () => {
      isMounted = false;
      clearInterval(adTimer);
    };
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="My Schedule" screenOptions={{}}>
        <Stack.Screen
          name="My Schedule"
          component={ScheduleScreen}
          options={{
            header: () => <CustomHeader title="My Schedule" type="drawer" />,
          }}
        />
        <Stack.Screen
          name="Add Schedule"
          component={AddScheduleScreen}
          options={{
            header: () => <CustomHeader title="Add Lecture" />,
          }}
        />
        <Stack.Screen
          name="EditSchedule"
          component={EditScheduleScreen}
          options={{
            header: () => <CustomHeader title="Edit Lecture" />,
          }}
        />
      </Stack.Navigator>
      {ad && (
        <StickyAd
          title={ad.title}
          description={ad.description}
          imageUrl={ad.image}
        />
      )}
    </View>
  );
};

export default React.memo(ScheduleStack);
ScheduleStack.displayName = "ScheduleStack";
