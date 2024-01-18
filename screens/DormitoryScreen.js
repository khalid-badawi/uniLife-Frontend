import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import DormitoryCard from "../components/DormitoryCard";
import DormitoryModal from "../components/DormitoryModal";
const DormitoryScreen = () => {
  const [type, setType] = useState("Any");
  const [distance, setDistance] = useState("Any");
  const [gender, setGender] = useState("Any");
  const [priceOrder, setPriceOrder] = useState("ASC");

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };
  return (
    <View style={styles.root}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity style={styles.filter} onPress={openFilterModal}>
          <AntDesign name="filter" size={23} style={styles.icon} />
          <Text style={{ fontSize: 17, color: "#8F00FF", fontWeight: "bold" }}>
            Filter Dormitories
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ height: 10, backgroundColor: "#E3E3E3", marginTop: 10 }}
      ></View>
      <DormitoryCard />
      <DormitoryModal
        visible={isFilterModalVisible}
        closeModal={closeFilterModal}
        type={type}
        setType={setType}
        distance={distance}
        setDistance={setDistance}
        priceOrder={priceOrder}
        setPriceOrder={setPriceOrder}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: { backgroundColor: "white", flex: 1 },
  filter: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  icon: { color: "#8F00FF" },
});
export default DormitoryScreen;
