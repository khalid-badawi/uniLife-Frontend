import React, { useState, Component, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox from "@rnmapbox/maps";
import Geolocation from "react-native-geolocation-service";
import { RoutingApi, Configuration, RouteRequest } from "@stadiamaps/api";
import CustomButton from "./CustomButton";
// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
import { PermissionsAndroid } from "react-native";
const routeData = require("../data/routeData.json");
const KEY = "a02969d3-9209-42cc-82f9-5c57b3394ca4";
Mapbox.setWellKnownTileServer("Mapbox");
Mapbox.setAccessToken(
  "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w"
);

const Map = ({
  currentPosition,
  setCurrentPosition,
  routeCoordinates,
  destCoordinates,
}) => {
  const x = () => {
    console.log(routeCoordinates);
  };
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;

  //       console.warn(longitude);
  //       console.warn(latitude);
  //       setCurrentPosition([longitude, latitude]);
  //     },
  //     (error) => {
  //       console.error("error getting current position", error);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // }, []);
  const coordinates = routeCoordinates.map((coord) => [
    coord.longitude,
    coord.latitude,
  ]);

  return (
    <View style={styles.page}>
      <Mapbox.MapView
        style={styles.map}
        logoEnabled={false}
        styleURL="mapbox://styles/mapbox/streets-v12"
      >
        <Mapbox.Camera zoomLevel={16.5} centerCoordinate={currentPosition} />
        {
          <Mapbox.PointAnnotation
            id="currentPosition"
            coordinate={currentPosition}
            draggable={true}
            onDragEnd={(event) => {
              setCurrentPosition(event.geometry.coordinates);
            }}
          />
        }
        {destCoordinates && (
          <Mapbox.PointAnnotation
            id="destCoordinates"
            coordinate={destCoordinates}
            title="destination"
            draggable={false}
          />
        )}

        <Mapbox.ShapeSource
          id="lineSource"
          shape={{
            type: "LineString",
            coordinates: coordinates,
          }}
        >
          <Mapbox.LineLayer
            id="lineLayer"
            style={{
              lineColor: "blue",
              lineWidth: 3,
            }}
          />
        </Mapbox.ShapeSource>
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
export default Map;
