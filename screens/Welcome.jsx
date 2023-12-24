import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Welcome({ navigation }) {
  const [tpayid, settpayid] = React.useState(false);

  return (
    <>
      <View style={styles.section}>
        <View style={styles.topSection}>
          <Image
            source={require("../assets/logo.png")}
            style={{ left: windowWidth / 12, height: 300, width: 300 }}
          />
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.bottomSectionTitle}>Welcome to T-Pay</Text>
          <View>
            <Text style={styles.info}>
              Amazing gifts and rewards, just for you !!!
            </Text>
          </View>
          <TouchableOpacity
            style={styles.getStartedBotton}
            onPress={() => {
              navigation.navigate("Register", { authfunction: "register" });
            }}
          >
            <Text style={styles.bottonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.getStartedBotton}
            onPress={() => {
              navigation.navigate("Register", { authfunction: "login" });
            }}
          >
            <Text style={styles.bottonText}>Login</Text>
          </TouchableOpacity>
          {/* <View style={styles.question}>
            <Text>Already have an account ?</Text>
            <TouchableOpacity style={{ left: windowWidth * 0.03 }}>
              <Text style={{ color: "#EBA800", fontWeight: "700" }}>Login</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  appTitle: {
    fontSize: windowWidth * 0.3,
    color: "#fff",
    fontWeight: "700",
  },
  bottomSection: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: "5%",
    display: "flex",
    flexDirection: "column",
  },

  bottomSectionTitle: {
    fontSize: windowWidth * 0.07,
    fontWeight: "600",
    color: "#000",
  },

  deciever: {
    fontSize: windowWidth * 0.1,
    fontWeight: "800",
    top: windowHeight * 0.01,
    textAlign: "center",
  },

  info: {
    fontSize: windowWidth * 0.04,
    fontWeight: "700",
    alignSelf: "center",
    top: windowHeight * 0.02,
    color: "#EBA800",
    letterSpacing: 2,
    textAlign:'center'
  },
  getStartedBotton: {
    backgroundColor: "#051852",
    top: windowHeight * 0.04,
    width: windowWidth * 0.8,
    height: windowHeight * 0.07,
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
  },

  bottonText: {
    color: "#fff",
    fontSize: windowWidth * 0.05,
    top: windowHeight * 0.025,
    fontWeight: "600",
  },

  question: {
    top: windowHeight * 0.06,
    flexDirection: "row",
  },
});
