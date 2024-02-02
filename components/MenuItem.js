import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import test from "../assets/test.jpg";
import test2 from "../assets/test2.png";
import Icon from "react-native-vector-icons/AntDesign";
import ItemDetails from "./ItemDetails";
import CustomButton from "./CustomButton";
import FastImage from "react-native-fast-image";

const MenuItem = ({ item, setOrderContent, orderContent }) => {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const foundItem = orderContent.find(
      (orderItem) => orderItem.itemId === item.foodId
    );
    setQuantity(foundItem ? foundItem.Quantity : 0);
  }, [orderContent]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      const index = orderContent.findIndex(
        (orderItem) => orderItem.itemId === item.foodId
      );

      if (index !== -1) {
        // If item exists in orderContent, update its quantity or remove if quantity is 1
        const updatedOrderContent = [...orderContent];
        if (updatedOrderContent[index].Quantity > 1) {
          updatedOrderContent[index] = {
            ...updatedOrderContent[index],
            Quantity: updatedOrderContent[index].Quantity - 1,
          };
        } else {
          updatedOrderContent.splice(index, 1);
        }
        setOrderContent(updatedOrderContent);
      }
    }
    console.log(orderContent);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
    const index = orderContent.findIndex(
      (orderItem) => orderItem.itemId === item.foodId
    );

    if (index !== -1) {
      // If item exists in orderContent, update its quantity
      const updatedOrderContent = [...orderContent];
      updatedOrderContent[index] = {
        ...updatedOrderContent[index],
        Quantity: updatedOrderContent[index].Quantity + 1,
      };
      setOrderContent(updatedOrderContent);
    } else {
      // If item does not exist in orderContent, add a new entry
      setOrderContent([
        ...orderContent,
        {
          itemId: item.foodId,
          Quantity: 1,
          price: item.price,
          itemName: item.nameOfFood,
        },
      ]);
    }
  };
  return (
    <View style={styles.root}>
      <FastImage
        source={{ uri: item.image }}
        style={styles.img}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <Text style={styles.mainTxt}>{item.nameOfFood}</Text>
      <Text style={styles.descTxt}>{item.description}</Text>
      <View
        style={{
          flexDirection: "row",

          marginTop: 20,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "25%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.price}₪
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <TouchableOpacity onPress={handleMinus}>
            <Icon name="minussquare" style={styles.icon} size={25} />
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 5 }}>{quantity}</Text>
          <TouchableOpacity onPress={handlePlus}>
            <Icon name="plussquare" style={styles.icon} size={25} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "25%",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#8F00FF" }}>
              details
            </Text>
            <Icon name="arrowright" style={{ ...styles.icon }} size={21} />
          </TouchableOpacity>
        </View>
      </View>

      <ItemDetails
        key={item.foodId} // Add a unique key prop
        isVisible={isModalVisible}
        closeModal={() => {
          setModalVisible(false);
        }}
        item={item}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 10,
    marginTop: 2,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 10,

    paddingBottom: 10,
    width: "90%",
    alignSelf: "center",
  },

  img: {
    alignSelf: "center",
    width: "60%",
    height: 170,
    marginVertical: 10,
  },
  textCont: {
    width: "100%",
    marginLeft: 15,
  },
  mainTxt: {
    fontWeight: "bold",
    fontSize: 20,
    //color: "#8F00F0",
    marginLeft: 15,
    alignSelf: "center",
    marginBottom: 10,
  },
  descTxt: {
    marginLeft: 15,
    marginRight: 15,
  },

  icon: {
    color: "#8F00FF",
  },
});
export default MenuItem;
