import React from "react";

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

export default function ErrorMessageCard({ message, handleClick }) {
  return (
    <>
      <View style={styles.errorContainerFade}>
        <MaterialIcons name={"error-outline"} size={80} color={"#D96060"} />
        <Text style={{ color: "#D96060", fontSize: 20, fontWeight: "500" }}>
          Error 404
        </Text>
        <Text style={styles.errorMessage}>{message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleClick}>
          <Text style={styles.retryButtonText}>retry</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  errorContainerFade: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
  },
  erorrContainer: {
    width: width * 0.7,
    height: height * 0.3,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  errorContainerHead: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  errorContainerBody: {
    width: "100%",
    height: "50%",
    justifyContent: "space-evenly",
  },

  errorMessage: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  retryButton: {
    backgroundColor: "#D96060",
    width: 80,
    height: 30,
    borderRadius: "50%",
    alignSelf: "center",
  },

  retryButtonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "600",
    textAlign: "center",
    top: "25%",
  },
});
