import React, { useState, Component, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox from "@rnmapbox/maps";
import Icon from "react-native-vector-icons/FontAwesome";
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
