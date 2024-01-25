import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Map from "../components/Map";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { getTokenFromKeychain } from "../globalFunc/Keychain";
import BASE_URL from "../BaseUrl";
import axios from "axios";
import { useUser } from "../Contexts/UserContext";
const routeData = require("../data/routeData.json");

function MapScreen() {
  const searchOptions = ["Building Name", "Class Number"];
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [currentPosition, setCurrentPosition] = useState([35.22214, 32.22802]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [searchBy, setSearchBy] = useState(searchOptions[0]);
  const [faculties, setFaculties] = useState([]);
  const [destCoordinates, setDestCoordinates] = useState(currentPosition);
  const [classNum, setClassNum] = useState("");
  const { userId } = useUser();
  const handlePickerChange = (itemValue, itemIndex) => {
    setSearchBy(itemValue);
  };
  console.log(selectedBuilding);
  useEffect(() => {
    const getFaculties = async () => {
      try {
        console.log("hi", userId);

        const token = await getTokenFromKeychain();
        const response = await axios.get(`${BASE_URL}/faculty/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle the response data here, for example:
        const result = response.data;
        setFaculties(result);
        console.log(result[0].locations);
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
    };
    getFaculties();
  }, []);
  const showNextLecture = () => {};

  const fetchRouteForEntrance = async (entrance) => {
    const [long1, lat1] = currentPosition;
    const long2 = entrance.lon;
    const lat2 = entrance.lat;
    const accessToken =
      "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w"; // Replace with your Mapbox access token

    const mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${long1},${lat1};${long2},${lat2}?geometries=geojson&access_token=${accessToken}`;

    try {
      const response = await fetch(mapboxUrl);
      const data = await response.json();
      if (data.code === "Ok") {
        return data.routes[0].distance;
      } else {
        console.error("Error fetching route:", data.code);
        return Infinity; // Return a large distance in case of an error
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      return Infinity; // Return a large distance in case of an error
    }
  };

  const fetchRoute = async () => {
    const foundBuilding = faculties.find(
      (building) => building.facultyName === selectedBuilding
    );
    console.log(foundBuilding);
    if (foundBuilding) {
      const entranceDistances = await Promise.all(
        foundBuilding.locations.map((entrance) =>
          fetchRouteForEntrance(entrance)
        )
      );
      console.log(entranceDistances);

      const minDistanceIndex = entranceDistances.indexOf(
        Math.min(...entranceDistances)
      );
      const selectedEntrance = foundBuilding.locations[minDistanceIndex];
      setDestCoordinates([selectedEntrance.lon, selectedEntrance.lat]);

      const [long1, lat1] = currentPosition;
      const long2 = selectedEntrance.lon;
      const lat2 = selectedEntrance.lat;
      const accessToken =
        "pk.eyJ1IjoiajFyZW4iLCJhIjoiY2xvcm9zdm85MHY5czJrbzZrdXI1amZmMSJ9.UW9QsP8ErGFgGNctDwoG5w"; // Replace with your Mapbox access token

      const mapboxUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${long1},${lat1};${long2},${lat2}?geometries=geojson&access_token=${accessToken}`;

      try {
        const response = await fetch(mapboxUrl);
        const data = await response.json();
        if (data.code === "Ok") {
          const coordinates = data.routes[0].geometry.coordinates.map(
            (coord) => ({
              latitude: coord[1],
              longitude: coord[0],
            })
          );
          setRouteCoordinates(coordinates);
        } else {
          console.error("Error fetching route:", data.code);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    }
  };
  return (
    <>
      <View style={styles.root}>
        <View style={{ ...styles.mapCont, height: 0.8 * height }}>
          <Map
            currentPosition={currentPosition}
            routeCoordinates={routeCoordinates}
            destCoordinates={destCoordinates}
            setCurrentPosition={setCurrentPosition}
            fetch={fetchRoute}
          />
          <View style={styles.footer}>
            <View style={{ ...styles.pickerCont, marginTop: 5 }}>
              <Picker
                selectedValue={selectedBuilding}
                onValueChange={setSelectedBuilding}
                itemStyle={{ textAlign: "right" }}
              >
                {faculties.map((building) => (
                  <Picker.Item
                    key={building.facultyName}
                    label={building.facultyName}
                    value={building.facultyName}
                  />
                ))}
              </Picker>
            </View>

            <CustomButton text="Show Route" onPress={fetchRoute} />

            <CustomButton
              text="Indoor Navigation"
              type="Tertiary"
              onPress={() => navigation.navigate("IndoorQR")}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  mapCont: {},
  pickerCont: {
    borderColor: "#8F00FF",
    borderRadius: 15,
    borderWidth: 1,
    overflow: "hidden",

    width: "100%",
  },
  footer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});
export default React.memo(MapScreen);
MapScreen.displayName = "MapScreen";
