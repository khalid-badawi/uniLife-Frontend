import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Map from "../components/Map";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
const routeData = require("../data/routeData.json");

export default function MapScreen() {
  const searchOptions = ["Building Name", "Class Number"];

  const { height, width } = useWindowDimensions();
  const [selectedBuilding, setSelectedBuilding] = useState(
    routeData.buildings[0].title
  );
  const [currentPosition, setCurrentPosition] = useState([35.22214, 32.22802]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [searchBy, setSearchBy] = useState(searchOptions[0]);
  const [destCoordinates, setDestCoordinates] = useState(currentPosition);
  const [classNum, setClassNum] = useState("");
  const handlePickerChange = (itemValue, itemIndex) => {
    setSearchBy(itemValue);
  };

  const showNextLecture = () => {};

  const fetchRouteForEntrance = async (entrance) => {
    const [long1, lat1] = currentPosition;
    const long2 = entrance.long;
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
    const foundBuilding = routeData.buildings.find(
      (building) => building.title === selectedBuilding
    );

    const entranceDistances = await Promise.all(
      foundBuilding.alt.map((entrance) => fetchRouteForEntrance(entrance))
    );

    const minDistanceIndex = entranceDistances.indexOf(
      Math.min(...entranceDistances)
    );
    const selectedEntrance = foundBuilding.alt[minDistanceIndex];
    console.log(selectedEntrance);
    setDestCoordinates([selectedEntrance.long, selectedEntrance.lat]);

    const [long1, lat1] = currentPosition;
    const long2 = selectedEntrance.long;
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
  };
  return (
    <View style={styles.root}>
      <View style={{ ...styles.mapCont, height: 0.8 * height }}>
        <Map
          currentPosition={currentPosition}
          routeCoordinates={routeCoordinates}
          destCoordinates={destCoordinates}
          setCurrentPosition={setCurrentPosition}
        />
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
              width: "50%",
              marginLeft: 5,
            }}
          >
            <Text style={{ marginRight: 10, fontSize: 15 }}>Search By:</Text>
            <View style={{ ...styles.pickerCont }}>
              <Picker
                placeholder="Search By"
                selectedValue={searchBy}
                onValueChange={handlePickerChange}
              >
                {searchOptions.map((option, index) => (
                  <Picker.Item
                    key={index}
                    label={option}
                    value={option}
                    style={{ textAlign: "right" }}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {searchBy === searchOptions[0] && (
            <View style={{ ...styles.pickerCont, marginTop: 5 }}>
              <Picker
                selectedValue={selectedBuilding}
                onValueChange={setSelectedBuilding}
                itemStyle={{ textAlign: "right" }}
              >
                {routeData.buildings.map((building) => (
                  <Picker.Item
                    key={building.title}
                    label={building.title}
                    value={building.title}
                  />
                ))}
              </Picker>
            </View>
          )}
          {searchBy === searchOptions[1] && (
            <CustomInput
              value={classNum}
              setValue={setClassNum}
              placeholder="Class Number eg.11G240"
            />
          )}

          <CustomButton text="Show Route" onPress={fetchRoute} />
          <CustomButton
            text="Next Lecture"
            onPress={showNextLecture}
            type="Tertiary"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
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
