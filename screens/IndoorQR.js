import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import CustomInput from "../components/CustomInput";
import Icon from "react-native-vector-icons/AntDesign";
import CustomButton from "../components/CustomButton";
const IndoorQR = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [openScanner, setOpenScanner] = useState(false);
  const [textScanned, setTextScanned] = useState("");
  const [inputTxt, setInputTxt] = useState("");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanner = ({ type, data }) => {
    setTextScanned(data);
    console.log("Type:" + type + " data:" + data);
    setOpenScanner(false);
  };

  const resetScanner = () => {
    setOpenScanner(false);
  };
  const enableScanner = () => {
    setOpenScanner(true);
    setTextScanned("");
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
            Enter the class number to which you want to go and scan the QR codes
            you see in the building.
          </Text>
          <View style={styles.input}>
            <CustomInput
              value={inputTxt}
              setValue={setInputTxt}
              placeholder="Class Number,e.g 11G150"
            />
            <CustomButton text="Scan" onPress={enableScanner} />
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.resultTxt}>
              You are currently in{" "}
              <Text style={styles.nestedTxt}>Engineering Faculty</Text>, Ground
              Floor, inorder to go to 11G170, Go 7 Buildings towards the right
            </Text>
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
export default IndoorQR;
