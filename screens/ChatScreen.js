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
  TouchableOpacity,
  Keyboard,
  Image,
} from "react-native";
import CustomHeader from "../navigation/CustomHeader";
import io from "socket.io-client";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import BASE_URL from "../BaseUrl";
import PickImageSmall from "../components/PickImageSmall";

const socket = io.connect("http://192.168.1.8:3000");

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
  const [chat, setChat] = useState([]);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [receivedImage, setReceivedImage] = useState(null);
  const [image, setImage] = useState(null);
  const { userId } = useUser();
  const currentUserId = userId;
  console.log("Currentuser=" + currentUserId);
  const { recieverId } = useRoute();
  const recieverUser = currentUserId === 4 ? 5 : 4;
  const messageId = chat.length + 1;
  console.log(currentUserId, recieverUser);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = await getTokenFromKeychain();
        const response = await axios.get(
          `${BASE_URL}/message/${currentUserId}/${recieverUser}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the response data here, for example:
        const lol = response.data;
        setChat(response.data.data);
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

  useEffect(() => {
    // Connect to the server and listen for private messages
    socket.emit("login", userId);

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  //notificationEnd
  useEffect(() => {
    socket.connect();
    console.log("xd");
    socket.on("privateMessage", ({ senderId, message }) => {
      // Create a new message object with the same structure as the existing messages
      const newMessage = { senderId, text: message, createdAt: Date.now() };
      setChat((prevChat) => [newMessage, ...prevChat]);
    });
    socket.on("imageMessage", ({ image, senderId }) => {
      setReceivedImage(image);
      console.log(image);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  // const storeMessage = async () => {
  //   try {
  //     const token = await getTokenFromKeychain();

  //     const formData = new FormData();

  //     formData.append("data", JSON.stringify({ text: message }));
  //     console.log(formData);
  //     const response = await axios.post(
  //       `http://10.0.2.2:3000/api/v1/unilife/message/${currentUserId}/${recieverUser}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     if (error.response) {
  //       Alert.alert("Error", error.response.data.message);
  //     } else if (error.request) {
  //       Alert.alert(
  //         "Network Error",
  //         "There was a problem with the network. Please check your internet connection and try again.",
  //         [{ text: "OK" }]
  //       );
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       Alert.alert(
  //         "Something Wrong",
  //         "Something went wrong, try again please",
  //         [{ text: "OK" }]
  //       );
  //     }
  //   }
  // };
  const sendImage = async () => {
    try {
      console.log("uri:", image.uri);
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const senderId = currentUserId;
      const receiverId = recieverUser;

      socket.emit("imageMessage", {
        senderId,
        receiverId,
        image: base64,
      });
      setImage(null);
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  const handleSend = async () => {
    if (image) {
      await sendImage();
    } else if (message.trim() !== "") {
      // await storeMessage();
      socket.emit("privateMessage", {
        id: messageId,
        senderId: currentUserId,
        receiverId: recieverUser,
        message,
      });
      const newMessage = {
        senderId: currentUserId,
        text: message,
        createdAt: Date.now(),
      };

      setChat((prevChat) => [newMessage, ...prevChat]);
      setMessage("");
    }
  };

  const renderMessageItem = ({ item, index }) => {
    const isCurrentUser = item.senderId === currentUserId;
    let objectURL = "";
    const bubbleStyle = isCurrentUser
      ? styles.currentUserBubble
      : styles.otherUserBubble;
    const textStyle = isCurrentUser
      ? styles.currentUserText
      : styles.otherUserText;
    const timeFormatOptions = { hour: "numeric", minute: "numeric" };
    const messageDate = new Date(item.createdAt);

    const nextMessageIsDateSeparator =
      index < chat.length - 1 && chat[index + 1].type === "dateSeparator";

    const showDateSeparator =
      index === chat.length - 1 ||
      (new Date(chat[index + 1].createdAt).toLocaleDateString() !==
        messageDate.toLocaleDateString() &&
        !nextMessageIsDateSeparator);

    return (
      <View>
        {showDateSeparator && (
          <Text style={styles.dateSeparator}>
            {getFormattedDate(messageDate)}
          </Text>
        )}
        <View
          style={[
            styles.messageContainer,
            isCurrentUser && styles.currentUserContainer,
          ]}
        >
          {isCurrentUser && (
            <Text style={styles.createdAtText}>
              {messageDate.toLocaleTimeString(undefined, timeFormatOptions)}
            </Text>
          )}
          {item.text && (
            <View style={[styles.messageBubble, bubbleStyle]}>
              <Text style={textStyle}>{item.text}</Text>
            </View>
          )}

          {item.image && (
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          )}
          {!isCurrentUser && (
            <Text style={styles.createdAtText}>
              {messageDate.toLocaleTimeString(undefined, timeFormatOptions)}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const getFormattedDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={[...chat]}
        renderItem={renderMessageItem}
        keyExtractor={(_, index) => index.toString()}
        inverted
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss(); // Hide the keyboard
            setShowEmojiSelector(!showEmojiSelector);
          }}
          style={styles.btnCont}
        >
          <Icon name="smile" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCont}>
          <PickImageSmall
            iconName="image"
            size={22}
            image={image}
            setImage={setImage}
            sendImage={sendImage}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          onFocus={() => {
            console.log("TextInput focused");
            setShowEmojiSelector(false);
          }} // Hide emoji picker on focus
        />

        <TouchableOpacity onPress={handleSend} style={styles.btnCont}>
          <Icon name="send" size={22} color="white" />
        </TouchableOpacity>
      </View>
      {showEmojiSelector && (
        <View style={{ height: 250 }}>
          <EmojiSelector
            category={Categories.emotion}
            onEmojiSelected={(emoji) => {
              setMessage((prevMessage) => prevMessage + emoji);
            }}
            showTabs={false}
            showSearchBar={false}
            columns={10}
          />
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 8,
    marginHorizontal: 2,
  },
  messageBubble: {
    padding: 8,
    borderRadius: 20,
    paddingHorizontal: 20,
    maxWidth: "80%",
  },
  currentUserContainer: {
    alignSelf: "flex-end",
  },
  currentUserBubble: {
    backgroundColor: "#8F00FF",
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
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 5,
  },
  btn: {
    color: "white",
  },
  btnCont: {
    backgroundColor: "#8F00FF",
    padding: 11,
    paddingRight: 13,
    paddingTop: 13,

    borderRadius: 25,
    marginHorizontal: 2,
    marginBottom: 5,
  },
  createdAtText: {
    fontSize: 11,
    color: "gray",
    alignSelf: "flex-end",

    marginHorizontal: 2,
    marginBottom: 2,
  },
  dateSeparator: {
    textAlign: "center",
    color: "gray",
    fontSize: 15,
    marginVertical: 10,
  },
});

export default ChatScreen;
