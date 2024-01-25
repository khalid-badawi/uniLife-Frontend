import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CafiteriaHome from "../screens/CafiteriaHome";
import RestaurantScreen from "../screens/RestaurantScreen";
import CheckOut from "../screens/CheckOut";
import { Header } from "react-native-elements";
import { Alert, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "./CustomHeader";
import MyOrders from "../screens/MyOrders";
import StickyAd from "../components/StickyAd";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import BASE_URL from "../BaseUrl";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";

const Stack = createNativeStackNavigator();

const CafiteriaStack = () => {
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
  console.log(ad);
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="CafiteriaScreen">
        <Stack.Screen
          name="CafiteriaScreen"
          component={CafiteriaHome}
          options={{
            header: () => <CustomHeader title="Cafeteria" type="drawer" />,
          }}
        />
        <Stack.Screen
          name="RestaurantScreen"
          component={RestaurantScreen}
          options={{
            header: () => <CustomHeader title="Restaurant" type="stack" />,
          }}
        />
        <Stack.Screen
          name="CheckOut"
          component={CheckOut}
          options={{
            header: () => <CustomHeader title="Check Out" type="stack" />,
          }}
        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            header: () => <CustomHeader title="My Orders" type="stack" />,
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

export default CafiteriaStack;
