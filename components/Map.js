import React, { useState, Component, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox from "@rnmapbox/maps";
import Geolocation from "react-native-geolocation-service";
import { RoutingApi, Configuration, RouteRequest } from "@stadiamaps/api";
import CustomButton from "./CustomButton";
// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
import { PermissionsAndroid } from "react-native";
const KEY = "a02969d3-9209-42cc-82f9-5c57b3394ca4";
Mapbox.setWellKnownTileServer("Mapbox");
Mapbox.setAccessToken(
  "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w"
);

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const fetchRoute = async () => {
    const startPoint = { lon: 35.22309, lat: 32.22747 };
    const endPoint = { lon: 35.22357, lat: 32.22705 };
    const accessToken =
      "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w"; // Replace with your Mapbox access token

    // Specify the profile as "walking" for walking directions

    const mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${startPoint.lon},${startPoint.lat};${endPoint.lon},${endPoint.lat}?geometries=geojson&access_token=${accessToken}`;

    try {
      const response = await fetch(mapboxUrl);
      const data = await response.json();
      console.log(data);
      if (data.code === "Ok") {
        const coordinates = data.routes[0].geometry.coordinates.map(
          (coord) => ({
            latitude: coord[1],
            longitude: coord[0],
          })
        );
        setRouteCoordinates(coordinates);
        console.log(coordinates);
        // Log coordinates for each step within each leg
      } else {
        console.error("Error fetching route:", data.code);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  const x = () => {
    console.log(routeCoordinates);
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        console.warn(longitude);
        console.warn(latitude);
        setCurrentPosition([longitude, latitude]);
      },
      (error) => {
        console.error("error getting current position", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);
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
        <Mapbox.Camera
          zoomLevel={15.5}
          centerCoordinate={[35.220937, 32.227382]}
        />

        {currentPosition && (
          <Mapbox.PointAnnotation
            id="currentPosition"
            coordinate={[35.224218, 32.227513]}
          />
        )}

        {/* Drawing the line */}
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
      <CustomButton text="route" onPress={fetchRoute} />
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
