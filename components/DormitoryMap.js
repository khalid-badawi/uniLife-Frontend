import React, { useState, Component, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox, { Logger } from "@rnmapbox/maps";
import Icon from "react-native-vector-icons/FontAwesome";
Logger.setLogCallback((log) => {
  return true;
});
// Logger.setLogCallback((log) => {
//   const { message } = log;

//   // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
//   if (
//     message.match("Request failed due to a permanent error: Canceled") ||
//     message.match("Request failed due to a permanent error: Socket Closed")
//   ) {
//     return true;
//   }

//   // handle eglSwapBuffer warning
//   if (message.includes("eglSwapBuffer error: 12301. Waiting for new surface")) {
//     // Do something to handle or suppress the warning
//     // For example, you can log it without returning true to continue processing other logs
//     console.warn("EGL Swap Buffer Warning: 12301. Waiting for new surface");
//     return false; // Continue processing other logs
//   }

//   return false;
// });
Mapbox.setWellKnownTileServer("Mapbox");
Mapbox.setAccessToken(
  "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w"
);

const DormitoryMap = ({ position }) => {
  return (
    <View style={styles.page}>
      <Mapbox.MapView
        style={styles.map}
        logoEnabled={false}
        styleURL="mapbox://styles/mapbox/streets-v12"
      >
        <Mapbox.Camera zoomLevel={15} centerCoordinate={position} />
        {<Mapbox.PointAnnotation id="position" coordinate={position} />}
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  map: {
    flex: 1,
    alignSelf: "stretch",
  },
});
export default DormitoryMap;
