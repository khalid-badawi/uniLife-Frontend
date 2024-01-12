import React, { useState, Component, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox from "@rnmapbox/maps";

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
import { PermissionsAndroid } from "react-native";

Mapbox.setWellKnownTileServer("Mapbox");
Mapbox.setAccessToken(
  "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w"
);

const Map = ({
  currentPosition,
  setCurrentPosition,
  routeCoordinates,
  destCoordinates,
  fetch,
}) => {
  const [userLocationWatchId, setUserLocationWatchId] = useState(null);
  const debounce = (func, delay) => {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
  useEffect(() => {
    // Call the fetch function after a delay of 3 seconds when currentPosition changes
    const delayedFetch = debounce(() => {
      fetch();
    }, 500);
    console.log("hello");

    delayedFetch();
  }, [currentPosition]);
  // useEffect(() => {
  //   // Request location permissions if not granted
  //   const requestLocationPermission = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Start watching user location
  //         const watchId = Geolocation.watchPosition(
  //           (position) => {
  //             const { latitude, longitude } = position.coords;
  //             console.log(latitude, longitude);
  //             setCurrentPosition([longitude, latitude]);
  //           },
  //           (error) => {
  //             console.error("Error getting current position", error);
  //           },
  //           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //         );
  //         setUserLocationWatchId(watchId);
  //       } else {
  //         console.warn("Location permission denied");
  //       }
  //     } catch (error) {
  //       console.error("Error requesting location permission", error);
  //     }
  //   };

  //   requestLocationPermission();

  //   // Cleanup function to clear the watch when the component is unmounted
  //   return () => {
  //     if (userLocationWatchId) {
  //       Geolocation.clearWatch(userLocationWatchId);
  //     }
  //   };
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
            onDrag={(event) => {
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
