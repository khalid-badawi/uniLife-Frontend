import { View, Text, Button, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import CustomInput from "../components/CustomInput";
import Icon from "react-native-vector-icons/AntDesign";
import CustomButton from "../components/CustomButton";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import axios from "axios";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import BASE_URL from "../BaseUrl";
import { useUser } from "../Contexts/UserContext";
const IndoorQR = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [openScanner, setOpenScanner] = useState(false);
  const [textScanned, setTextScanned] = useState(null);
  const [inputTxt, setInputTxt] = useState("");
  const [classInput, setClassInput] = useState(null);
  const [error, setError] = useState("");
  const [resultData, setResultData] = useState(null);
  const [message, setMessage] = useState("");
  const { userId } = useUser();
  const getDirection = async () => {
    if (textScanned) {
      try {
        console.log("hi", userId);

        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/location/${userId}`, {
          params: {
            goalLoc: classInput,
            myLoc: textScanned,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the response data here, for example:
        const result = response.data;
        setResultData(result);
        console.log(result);
        const { upDown, rightLeft, currFac, nextFac } = result;
        if (nextFac !== "") {
          setMessage(
            `You are in ${currFac}, You will need to go to ${nextFac}`
          );
        } else if (upDown !== 0) {
          setMessage(
            upDown > 0
              ? `Go Up ${upDown} Floors`
              : `Go Down ${-1 * upDown} Floors`
          );
        } else if (rightLeft !== 0) {
          setMessage(
            rightLeft > 0
              ? `Go Right ${rightLeft} Classes`
              : `Go Left ${-1 * rightLeft} Classes`
          );
        } else {
          setMessage("You are next to the right location");
        }

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
    }
  };
  useEffect(() => {
    getDirection();
  }, [textScanned]);
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanner = ({ data }) => {
    setTextScanned(data);
    console.log(" data:" + data);
    setOpenScanner(false);
  };

  const resetScanner = () => {
    setOpenScanner(false);
  };
  const enableScanner = () => {
    setOpenScanner(true);
    setTextScanned(null);
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Grant Permission please</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>No Access</Text>
      </View>
    );
  }

  var regex1 = /^\d{2}G\d{3}$/;
  var regex2 = /^\d{1}G\d{3}$/;
  var regex3 = /^\d{2}B\d{1}\d{3}$/;
  var regex4 = /^\d{1}B\d{1}\d{3}$/;
  var regex5 = /^\d{2}\d{1}\d{3}$/;
  var regex6 = /^\d{1}\d{1}\d{3}$/;
  function checkRegex(input) {
    let outputString = "";
    let matchResult = "";
    let faculty = "";
    let classNum = "";
    let floor = "";
    switch (true) {
      case regex1.test(input):
        console.log("Pattern 1 matched");
        faculty = input.slice(0, 2); // "11"
        floor = input.slice(2, 3); // "G"
        classNum = input.slice(3);

        break;
      case regex2.test(input):
        console.log("Pattern 2 matched");
        faculty = input.slice(0, 1); // "11"
        floor = input.slice(1, 2); // "G"
        classNum = input.slice(2);

        break;
      case regex3.test(input):
        console.log("Pattern 3 matched");
        faculty = input.slice(0, 2); // "11"
        floor = input.slice(2, 4); // "G"
        classNum = input.slice(4);
        break;
      case regex4.test(input):
        console.log("Pattern 4 matched");
        faculty = input.slice(0, 1); // "11"
        floor = input.slice(1, 3); // "G"
        classNum = input.slice(3);
        break;
      case regex5.test(input):
        console.log("Pattern 5 matched");
        faculty = input.slice(0, 2); // "11"
        floor = input.slice(2, 3); // "G"
        classNum = input.slice(3);
        break;
      case regex6.test(input):
        console.log("Pattern 6 matched");
        faculty = input.slice(0, 1); // "11"
        floor = input.slice(1, 2); // "G"
        classNum = input.slice(2);
        break;
      default:
        console.log("No pattern matched");
    }
    if (!classNum && !floor && !faculty) {
      return null;
    }
    return { faculty, floor, classNum };
  }

  // Test examples

  const handlePress = () => {
    setClassInput(checkRegex(inputTxt));
    console.log(classInput);
    if (!classInput) {
      setError("Please Enter a valid class number");
    }
    setError("");

    enableScanner();
    setError(JSON.stringify(resultData));
    console.log(textScanned);
  };
  return (
    <View style={styles.root}>
      {!openScanner && (
        <>
          <Icon
            name="qrcode"
            size={200}
            style={{ alignSelf: "center", marginTop: 20 }}
          />
          <Text style={styles.resultTxt}>
            Enter the class number to which you want to go and scan the QR code
            you see in the building.
          </Text>
          <View style={styles.input}>
            <CustomInput
              value={inputTxt}
              setValue={setInputTxt}
              placeholder="Class Number,e.g 11G150"
            />

            <CustomButton text="Scan" onPress={handlePress} />
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            {resultData && <Text style={{ fontSize: 16 }}>{message}</Text>}
          </View>
        </>
      )}
      {openScanner && (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanner}
            style={{ height: "80%", width: "100%" }}
          />
          <View style={styles.input}>
            <CustomButton text="cancel" onPress={resetScanner} />
          </View>
        </View>
      )}

      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanner}
        style={{ height: "50%", width: "100%" }}
      /> */}
      {/* {scanned && <Button title="Scan Again" onPress={resetScanner} />} */}
    </View>
  );
};
const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1, justifyContent: "center" },
  input: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  resultTxt: {
    fontSize: 17,
    marginHorizontal: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
  nestedTxt: {
    color: "#8F00FF",
    fontWeight: "bold",
  },
});

export default React.memo(IndoorQR);
IndoorQR.displayName = "IndoorQR";
