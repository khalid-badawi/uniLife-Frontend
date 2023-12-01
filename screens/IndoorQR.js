import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

const IndoorQR = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [textScanned, setTextScanned] = useState("");

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
    setScanned(true);
    setTextScanned(data);
    console.log("Type:" + type + " data:" + data);
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Permission</Text>
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
    <View>
      <Text>IndoorQR</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanner}
        style={{ height: 400, width: 400 }}
      />
    </View>
  );
};

export default IndoorQR;
