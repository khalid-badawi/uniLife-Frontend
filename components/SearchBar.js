import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = ({ searchText, setSearchText, placeholder }) => {
  return (
    <View style={styles.searchBarCont}>
      <Ionicons name="search" style={styles.icon} size={20} />

      <TextInput
        style={styles.searchBar}
        placeholder={placeholder}
        onChangeText={(text) => setSearchText(text)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchBarCont: {
    height: 50,
    borderRadius: 10,

    padding: 8,
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "#f0f2f5",
  },
  searchBar: {
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
    alignSelf: "center",
  },
});
export default SearchBar;
