import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import MenuRow from "../components/MenuRow";
import CustomHeader from "../components/CustomHeader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { color } from "react-native-elements/dist/helpers";
import { TextInput } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CheckOut = ({ navigation, route }) => {
  const data = route.params.data;
  const price = route.params.price;
  const [notes, setNotes] = useState("");

  return (
    <View style={styles.root}>
      <CustomHeader text="Confirm Order" onPress={() => navigation.goBack()} />
      <Icon name="cart-check" size={100} style={styles.icon} />

      <Text style={styles.mainTxt}>Almost Done</Text>
      <View style={styles.dataCont}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MenuRow
              itemText={item.itemName}
              quantity={item.Quantity}
              color="white"
            />
          )}
          keyExtractor={(item) => item.itemId}
          persistentScrollbar={true}
          scrollIndicatorInsets={{ color: "white" }}
        />

        <Text style={{ ...styles.mainTxt, color: "white" }}>
          Total Price:{price}₪
        </Text>
      </View>
      <View style={styles.notesCont}>
        <TextInput
          style={{ textAlignVertical: "top" }}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setNotes({ text })}
          value={notes}
          placeholder="Any Notes?"
        />
      </View>
      <View style={styles.buttonsCont}>
        <CustomButton text="Check Out" />
        <CustomButton
          text="Cancel"
          type="Tertiary"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
  },
  mainTxt: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
  },
  buttonsCont: {
    marginHorizontal: 30,
  },
  dataCont: {
    paddingTop: 40,
    paddingBottom: 30,
    height: "40%",
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: "#8F00FF",
  },
  notesCont: {
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#333333",
  },
  icon: {
    alignSelf: "center",
    marginTop: 20,
    color: "#8F00FF",
  },
});
export default CheckOut;
