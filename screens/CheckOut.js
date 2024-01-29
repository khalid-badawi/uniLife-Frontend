import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import CustomButton from "../components/CustomButton";
import MenuRow from "../components/MenuRow";
import CustomHeader from "../components/CustomHeader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native";
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../Contexts/UserContext";
import BASE_URL from "../BaseUrl";
import io from "socket.io-client";
import RadioGroup from "react-native-radio-buttons-group";
import WebView from "react-native-webview";
import { Button } from "react-native-elements";
const socket = io.connect("http://192.168.1.10:3000");

const CheckOut = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [tok, setTok] = useState("");
  const { restaurantId, data } = route.params;
  let token = "";
  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Upon receipt",
        value: "Upon receipt",
      },
      {
        id: "2",
        label: "Paypal",
        value: "Paypal",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState("1");
  console.log(selectedId);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    // Connect to the server and listen for private messages
    const connectToSocket = () => {
      socket.connect();
    };

    const handleReconnect = (attemptNumber) => {
      console.log(`Reconnecting... Attempt ${attemptNumber}`);
    };

    const handleConnect = () => {
      console.log("Connected to Socket.IO");
    };

    const handleDisconnect = () => {
      console.log("Disconnected from Socket.IO");
      // Attempt to reconnect when disconnected
      connectToSocket();
    };

    // Set up event listeners for connection status
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    socket.io.opts.reconnection = true; // Enable reconnection
    socket.io.opts.reconnectionAttempts = Infinity; // Retry indefinitely
    socket.io.opts.reconnectionDelay = 1000; // Initial delay before reconnecting
    socket.io.opts.reconnectionDelayMax = 5000; // Maximum delay between reconnects
    socket.io.opts.randomizationFactor = 0.5; // Randomization factor for delay

    // Start the initial connection
    connectToSocket();

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
      //Remove event listeners
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  const transformedArray = data.map((item) => {
    return {
      foodId: item.itemId,
      Qauntity: item.Quantity,
    };
  });
  useEffect(() => {
    const getToken = async () => {
      token = await getTokenFromKeychain();
      setTok(token);
      console.log("got:", token);
    };
    getToken();
  }, []);

  const price = route.params.price;
  const [notes, setNotes] = useState("");
  const { userId } = useUser();

  const confirmOrder = async () => {
    try {
      console.log("hi");
      token = await getTokenFromKeychain();
      const response = await axios.post(
        `${BASE_URL}/order/${userId}`,
        JSON.stringify({ restaurantId, orderItem: transformedArray, notes }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("gg");
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
  const confirmOrderPaypal = async () => {
    try {
      console.log("paypal");
      const token = await getTokenFromKeychain();
      setIsModalVisible(true);
      const response = await axios.post(
        `${BASE_URL}//payment/order/${userId}`,
        JSON.stringify({ restaurantId, orderItem: transformedArray, notes }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("gg");
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

  const handleCheckOut = async () => {
    if (selectedId === "1") {
      await confirmOrder();
      socket.connect();
      console.log("xdssss");
      socket.emit("newOrder", {
        restaurantId,
      });
      Alert.alert("Success", "Ordered Successfully");
      navigation.navigate("MyOrders");
    } else if (selectedId === "2") {
      console.log("ggzzz");

      console.log(token, notes, restaurantId, transformedArray);
      setIsModalVisible(true);
    }
  };
  const handleWebViewNavigation = (navState) => {
    // Check if the URL includes the success or cancel URL
    if (
      navState.url.includes(
        "http://192.168.1.10:3000/api/v1/unilife/payment/order/success"
      )
    ) {
      Alert.alert("Success", "Ordered Successfully, Wait for order updates", [
        { text: "OK" },
      ]);
      setIsModalVisible(false);
      socket.connect();
      console.log("xdssss");
      socket.emit("newOrder", {
        restaurantId,
      });
      navigation.navigate("MyOrders");
    } else if (
      navState.url.includes(
        "http://192.168.1.10:3000/api/v1/unilife/payment/order/cancel"
      )
    ) {
      Alert("Cancelled", "Payment Cancelled");
      setIsModalVisible(false);
    }
  };
  return (
    <View style={styles.root}>
      <Icon name="cart-check" size={100} style={styles.icon} />

      <Text style={styles.mainTxt}>Details</Text>
      <View style={styles.dataCont}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MenuRow
              itemText={item.itemName}
              quantity={item.Quantity}
              color="white"
            />
          )}
          keyExtractor={(item) => item.itemId}
          persistentScrollbar={true}
          scrollIndicatorInsets={{ color: "white" }}
        />

        <Text style={{ ...styles.mainTxt, color: "white" }}>
          Total Price:{price}₪
        </Text>
      </View>
      <View style={styles.notesCont}>
        <TextInput
          style={{ textAlignVertical: "top" }}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setNotes(text)}
          value={notes}
          placeholder="Any Notes?"
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          layout="row"
        />
      </View>
      <View style={styles.buttonsCont}>
        <CustomButton text="Check Out" onPress={handleCheckOut} />
        <CustomButton
          text="Cancel"
          type="Tertiary"
          onPress={() => navigation.goBack()}
        />
      </View>

      <Modal style={styles.modal} visible={isModalVisible}>
        <WebView
          source={{
            method: "POST",
            uri: `http://192.168.1.10:3000/api/v1/unilife/payment/order/${userId}`,
            body: `token=${tok}&orderArr=${JSON.stringify(
              transformedArray
            )}&restaurantId=${restaurantId}&notes=${notes}&price=${price}`,
          }}
          style={{ flex: 1 }}
          onNavigationStateChange={handleWebViewNavigation}
        ></WebView>
        <Button title="Close Modal" onPress={() => setIsModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
    flex: 1,
    paddingTop: 10,
  },
  modal: {
    height: "100%",
    width: "100%",
  },
  mainTxt: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
  },
  buttonsCont: {
    marginHorizontal: 30,
  },
  dataCont: {
    paddingTop: 40,
    paddingBottom: 30,
    height: "37%",
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 5,

    backgroundColor: "#8F00FF",
  },
  notesCont: {
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#333333",
  },
  icon: {
    alignSelf: "center",
    marginTop: 20,
    color: "#8F00FF",
  },
});

export default React.memo(CheckOut);
CheckOut.displayName = "CheckOut";
