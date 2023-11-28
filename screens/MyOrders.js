import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import OrderItem from "../components/OrderItem";
import CustomHeader from "../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
const MyOrders = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState();
  const uniqueCategories = ["Date", "Restaurant"];
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearch("");
  };
  const [selectedCategory, setSelectedCategory] = useState(uniqueCategories[0]);
  return (
    <View style={styles.root}>
      <CustomHeader text="My Orders" onPress={() => navigation.goBack()} />

      <View style={styles.searchBarCont}>
        <Ionicons name="search" style={styles.icon} size={20} />

        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
      </View>
      <View
        style={{
          marginLeft: 15,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>SearchBy:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
          }}
        >
          {uniqueCategories.map((category) => (
            <CustomButton
              key={category}
              text={category}
              type={category === selectedCategory ? "Selected" : "NotSelected"}
              onPress={() => handleCategoryClick(category)}
            />
          ))}
        </ScrollView>
      </View>
      <OrderItem />
      <OrderItem />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarCont: {
    height: 50,
    borderRadius: 10,

    padding: 8,
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 20,
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
export default MyOrders;
