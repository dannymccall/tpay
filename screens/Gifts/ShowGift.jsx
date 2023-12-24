import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import Header from "../../Components/Header";
export default function ShowGift({ navigation, route }) {
  const { gift } = route.params;
  return (
    <View style={styles.container}>
      <Header headerText="Gift" navigation={navigation}/>
      <View style={styles.giftSection}>
        <Text style={styles.title}>Congratulations</Text>
        <Text style={[styles.title, {fontSize:18}]}>Your gift is ready</Text>
        <Image source={require("../../assets/airpods.png")} style={styles.giftImage}/>
        <Text>{gift.gift}</Text>
        <View style={{alignItems:'center'}}>
            <Text>Call our office for any assistance</Text>
            <Text>050-4243-525</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  giftSection:{
    alignItems:'center',
    justifyContent:'space-around'
  },
  giftImage:{
    width: '50%',
    height:'50%'
  },
  title:{
    fontSize:20,
    fontWeight:'600'
  }
});
