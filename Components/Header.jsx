import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");
const headerHeight = height * 0.09;

export default function Header({ headerText, navigation }) {
  return (
    <>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <View
            style={{
              width: "100%",
            }}
          >
            <View style={styles.backNavigation}>
              <Ionicons
                name={"chevron-back"}
                size={20}
                color={"#fff"}
                onPress={() => navigation.goBack()}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                position: "absolute",
                alignSelf: "center",
              }}
            >
              {headerText}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#D2D2D2",
    paddingVertical:'1%'
  },
  backNavigation: {
    backgroundColor: "#051852",
    borderRadius: 100,
    top: "1%",
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
