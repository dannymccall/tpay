import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function Home({ navigation, route }) {
  useEffect(() => {
    setTimeout(() => {
      NetInfo.addEventListener((state) => {
        if (state.isConnected === false) {
          Alert.alert(
            "No Internet",
            "Please Check your internet and relaunch the app",
            [
              {
                text: "Okay",
              },
            ]
          );
        } else {
          navigation.navigate("Welcome");
        }
      });
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <ActivityIndicator size="large" style={{ bottom: "8%" }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 300,
    height: 300,
    left: "7%",
    bottom: "5%",
  },
});
