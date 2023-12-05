// Import necessary components from React Native
import React, { useState, useEffect } from "react";
import { useUser } from "../Contexts/UserContext";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import io from "socket.io-client";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import { Alert } from "react-native";

const socket = io.connect("http://192.168.1.2:3000");
const sampleMessages = [
  { id: 1, senderId: 1, content: "Hello" },
  { id: 2, senderId: 2, content: "Hi there!" },
  {
    id: 3,
    senderId: 1,
    content:
      "Howssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassaaaaaaaaaa are you?",
  },
  // Add more messages as needed
];
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
const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(sampleMessages);

  const { userId } = useUser();
  const currentUserId = userId;
  const recieverUser = currentUserId === 1 ? 2 : 1;
  const messageId = chat.length + 1;
  console.log(currentUserId, recieverUser);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = await getTokenFromKeychain();
        const response = await axios.get(
          `http://10.0.2.2:3000/api/v1/unilife/message/${currentUserId}/${recieverUser}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the response data here, for example:
        const lol = response.data;
        console.log(lol.data);
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

    // Call the function to make the GET request
    getMessages();
  }, []);
  useEffect(() => {
    // Connect to the server and listen for private messages
    socket.emit("login", userId);

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  // useEffect(() => {
  //   // Scroll to the end of the list when the component mounts or when chat updates
  //   flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  // }, [chat]);
  useEffect(() => {
    socket.connect();
    socket.on("privateMessage", ({ senderId, message }) => {
      // Create a new message object with the same structure as the existing messages
      const newMessage = { id: chat.length + 1, senderId, content: message };
      setChat((prevChat) => [...prevChat, newMessage]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  const storeMessage = async () => {
    try {
      const token = await getTokenFromKeychain();
      const response = await axios.post(
        `http://10.0.2.2:3000/api/v1/unilife/message/${currentUserId}/${recieverUser}`,
        JSON.stringify({ message }),
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

  const handleSend = async () => {
    // Replace 'receiverUserId' with the actual recipient's user ID
    await storeMessage();
    socket.emit("privateMessage", {
      id: messageId,
      senderId: currentUserId,
      receiverId: recieverUser,
      message,
    });
    const newMessage = {
      id: chat.length + 1,
      senderId: currentUserId,
      content: message,
    };

    setChat((prevChat) => [...prevChat, newMessage]);
    setMessage("");
  };

  const renderMessageItem = ({ item }) => {
    const isCurrentUser = item.senderId === currentUserId;
    const bubbleStyle = isCurrentUser
      ? styles.currentUserBubble
      : styles.otherUserBubble;
    const textStyle = isCurrentUser
      ? styles.currentUserText
      : styles.otherUserText;

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser && styles.currentUserContainer,
        ]}
      >
        <View style={[styles.messageBubble, bubbleStyle]}>
          <Text style={textStyle}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader text="Ahmad" />
      <FlatList
        data={[...chat].reverse()}
        renderItem={renderMessageItem}
        keyExtractor={(_, index) => index.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  messageBubble: {
    padding: 8,
    borderRadius: 8,
    maxWidth: "80%",
  },
  currentUserContainer: {
    alignSelf: "flex-end",
  },
  currentUserBubble: {
    backgroundColor: "#4CAF50",
  },
  currentUserText: {
    color: "white",
  },
  otherUserBubble: {
    backgroundColor: "#f1f1f1",
  },
  otherUserText: {
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});

export default ChatScreen;
