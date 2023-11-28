import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import MenuRow from "./MenuRow";
import CustomHeader from "./CustomHeader";
const data = [
  { Quantity: 1, itemId: "1", itemName: "Classic Burger", price: 9.99 },
  { Quantity: 2, itemId: "2", itemName: "Chicken Shawarma Wrap", price: 12.99 },
  { Quantity: 2, itemId: "3", itemName: "Margherita Pizza", price: 10.99 },
  { Quantity: 2, itemId: "4", itemName: "Classic Burger", price: 9.99 },
  {
    Quantity: 1,
    itemId: "12",
    itemName: "Chicken Shawarma Wrap",
    price: 12.99,
  },
  { Quantity: 1, itemId: "9", itemName: "Margherita Pizza", price: 10.99 },
];
const OrderItem = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.mainTxt}>Ordered By: </Text>
          <Text style={styles.descTxt}>Sa7eeta</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.mainTxt}>Ordered ID: </Text>
          <Text style={styles.descTxt}>105</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.mainTxt}>Ordered On: </Text>
          <Text style={styles.descTxt}>17-6-2023</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            minHeight: 50,
            maxHeight: 150,
          }}
        >
          <Text style={styles.mainTxt}>Content: </Text>
          <View>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <MenuRow
                  itemText={item.itemName}
                  quantity={item.Quantity}
                  color="black"
                />
              )}
              keyExtractor={(item) => item.itemId}
              persistentScrollbar={true}
              scrollIndicatorInsets={{ color: "blue" }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text style={styles.mainTxt}>Status: </Text>
          <Text style={{ ...styles.descTxt, color: "green" }}>Ready</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {},
  card: {
    backgroundColor: "white",
    minHeight: 200,
    maxHeight: 320,
    elevation: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  mainTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8F00FF",
  },
  descTxt: {
    fontSize: 16,
    fontWeight: "500",
  },
});
export default OrderItem;
