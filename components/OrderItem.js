import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import MenuRow from "./MenuRow";
import CustomHeader from "./CustomHeader";

const OrderItem = ({ item }) => {
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.mainTxt}>Ordered By: </Text>
          <Text style={styles.descTxt}>{item.restaurantName}</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.mainTxt}>Ordered ID: </Text>
          <Text style={styles.descTxt}>{item.orderId}</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.mainTxt}>Ordered On: </Text>
          <Text style={styles.descTxt}>{item.createdAt}</Text>
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
              data={item.items}
              renderItem={({ item }) => (
                <MenuRow
                  itemText={item.nameOfFood}
                  quantity={item.Qauntity}
                  color="black"
                />
              )}
              keyExtractor={(item) => item.nameOfFood}
              persistentScrollbar={true}
              scrollIndicatorInsets={{ color: "blue" }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ ...styles.descTxt, color: "green", fontWeight: "bold" }}
          >
            <Text style={styles.mainTxt}>Status: </Text>
            {item.status}
          </Text>

          <Text
            style={{ ...styles.descTxt, color: "black", fontWeight: "bold" }}
          >
            {item.totalPrice}₪
          </Text>
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
