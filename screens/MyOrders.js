import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import OrderItem from "../components/OrderItem";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";
import BASE_URL from "../BaseUrl";
import CustomHeader from "../navigation/CustomHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDrawer } from "../Contexts/openContext";
import { useDrawerStatus } from "@react-navigation/drawer";
import CustomInput from "../components/CustomInput";

const MyOrders = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const uniqueCategories = ["Latest", "Date"];
  const [selectedButton] = uniqueCategories;
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState("");
  const { userId } = useUser();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearch("");
  };
  const [showTimePicker1, setshowTimePicker1] = useState(false);

  const toggleTimePicker1 = () => {
    setshowTimePicker1(!showTimePicker1);
  };

  const onChangeDate = ({ type }, selectedTime) => {
    if (type == "set") {
      const currentTime = selectedTime;
      currentTime.setSeconds(0);
      setDate(currentTime);
      if (Platform.OS === "android") {
        toggleTimePicker1();
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };
        setDateText(currentTime.toLocaleDateString("en-US", options));
      }
    } else {
      toggleTimePicker1();
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(uniqueCategories[0]);
  console.log(selectedCategory);
  const getMenu = async () => {
    try {
      setIsLoading(true);
      const token = await getTokenFromKeychain();
      const response = await axios.get(`${BASE_URL}/orders/${userId}`, {
        params: { stringDate: selectedCategory === "Date" ? dateText : null },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Hellooo");
      // Handle the response data here, for example:
      const result = response.data;
      setOrders(result);
      console.log(result[0]);
      setIsLoading(false);
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
    const unsubscribe = navigation.addListener("focus", () => {
      getMenu();
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    getMenu();
  }, [dateText, selectedCategory]);
  return (
    <>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color="#8F00FF" />
        </View>
      )}
      {!isLoading && (
        <View style={styles.root}>
          <View
            style={{
              marginLeft: 15,
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Get By:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                flex: 1,
              }}
            >
              {uniqueCategories.map((category) => (
                <CustomButton
                  key={category}
                  text={category}
                  type={
                    category === selectedCategory ? "Selected" : "NotSelected"
                  }
                  onPress={() => handleCategoryClick(category)}
                />
              ))}
            </ScrollView>
          </View>
          {showTimePicker1 && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChangeDate}
            />
          )}
          {selectedCategory === "Date" && (
            <Pressable
              onPress={toggleTimePicker1}
              style={{ width: "70%", alignSelf: "center" }}
            >
              <CustomInput
                placeholder="Date"
                value={dateText}
                setValue={setDateText}
                secureTextEntry={false}
                editable={false}
              />
            </Pressable>
          )}

          <FlatList
            data={orders}
            renderItem={({ item }) => <OrderItem item={item} />}
            keyExtractor={(item) => item.orderId.toString()}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarCont: {
    height: 50,
    borderRadius: 10,

    padding: 8,
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: "#f0f2f5",
  },
  searchBar: {
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
    alignSelf: "center",
  },
});

export default React.memo(MyOrders);
MyOrders.displayName = "MyOrders";
