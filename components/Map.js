import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Mapbox, { Logger } from "@rnmapbox/maps";
import Ionicons from "react-native-vector-icons/Ionicons";

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
import { PermissionsAndroid } from "react-native";
Logger.setLogCallback((log) => {
  // Always return true to prevent further processing of logs
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

const Map = ({
  currentPosition,
  setCurrentPosition,
  routeCoordinates,
  destCoordinates,
  fetch,
}) => {
  const [userLocationWatchId, setUserLocationWatchId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  console.log(isLoading);
  return (
    <>
      <View style={styles.page}>
        <Mapbox.MapView
          style={styles.map}
          logoEnabled={false}
          styleURL="mapbox://styles/mapbox/streets-v12"
          onDidFinishLoadingMap={() => setIsLoading(false)}
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
              style={{
                icon: {
                  // You can customize the color here
                  color: "red",
                },
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
    </>
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
