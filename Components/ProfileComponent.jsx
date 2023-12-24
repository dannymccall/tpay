import React from "react";

import { View, Text, StyleSheet, Dimensions } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { storeInAsyncStorage, getItemFromAsyncStorage } from "../utils";

const { width, height } = Dimensions.get("window");

export default function ProfileComponent() {

  const [tpayid, settpayid] = React.useState('');
  React.useEffect(() => {
    getItemFromAsyncStorage("tpayid").then((id) => {
      settpayid(id);
    });
  }, []);

  return (
    <>
      <View
        style={{ flexDirection: "column", justifyContent: "space-between" }}
      >
        <View style={styles.accountDetailsContainer}>
          <Text style={styles.header}>account details</Text>
          <View style={styles.tpayidContainer}>
            <View style={styles.tpaytitleContainer}>
              <View style={styles.tpaytitleIcon}>
                <MaterialCommunityIcons
                  name={"account-details-outline"}
                  size={25}
                  color={"#fff"}
                  onPress={() => console.log("edit icon pressed")}
                />
              </View>
              <Text style={styles.tpaytitle}>T-PAY ID</Text>
            </View>
            <Text style={styles.id}>{tpayid}</Text>
          </View>
          <View style={styles.tpayidContainer}>
            <View style={styles.tpaytitleContainer}>
              <View
                style={[styles.tpaytitleIcon, { backgroundColor: "#051852" }]}
              >
                <MaterialCommunityIcons
                  name={"scoreboard"}
                  size={25}
                  color={"#fff"}
                  onPress={() => console.log("edit icon pressed")}
                />
              </View>
              <Text style={styles.tpaytitle}>Credit Score</Text>
            </View>
            <MaterialIcons
              name={"arrow-forward-ios"}
              size={25}
              color={"gray"}
              onPress={() => console.log("edit icon pressed")}
            />
          </View>
          <View style={styles.tpayidContainer}>
            <View style={styles.tpaytitleContainer}>
              <View
                style={[styles.tpaytitleIcon, { backgroundColor: "#EBA800" }]}
              >
                <MaterialIcons
                  name={"payment"}
                  size={25}
                  color={"#fff"}
                  onPress={() => console.log("edit icon pressed")}
                />
              </View>
              <Text style={styles.tpaytitle}>E-Payment</Text>
            </View>
            <MaterialIcons
              name={"arrow-forward-ios"}
              size={25}
              color={"gray"}
              onPress={() => console.log("edit icon pressed")}
            />
          </View>
          <View style={styles.tpayidContainer}>
            <View style={styles.tpaytitleContainer}>
              <View style={[styles.tpaytitleIcon, { backgroundColor: "gray" }]}>
                <MaterialCommunityIcons
                  name={"form-textbox-password"}
                  size={25}
                  color={"#fff"}
                  onPress={() => console.log("edit icon pressed")}
                />
              </View>
              <Text style={styles.tpaytitle}>Change PIN</Text>
            </View>
            <MaterialIcons
              name={"arrow-forward-ios"}
              size={25}
              color={"gray"}
              onPress={() => console.log("edit icon pressed")}
            />
          </View>
        </View>
        <View>
          <Text style={[styles.header,{top:20}]}>about us</Text>
          <View style={styles.accountDetailsContainer}>
          <View style={styles.tpayidContainer}>
            <View style={styles.tpaytitleContainer}>
              <View style={styles.tpaytitleIcon}>
                <AntDesign
                  name={"question"}
                  size={25}
                  color={"#fff"}
                  onPress={() => console.log("edit icon pressed")}
                />
              </View>
              <Text style={styles.tpaytitle}>Frequently Asked Questions (FAQs)</Text>
            </View>
            <MaterialIcons
              name={"arrow-forward-ios"}
              size={25}
              color={"gray"}
              onPress={() => console.log("edit icon pressed")}
            />
          </View>
          <View style={styles.tpayidContainer}>
            <View style={styles.tpaytitleContainer}>
              <View
                style={[styles.tpaytitleIcon, { backgroundColor: "#051852" }]}
              >
                <Feather
                  name={"phone-call"}
                  size={25}
                  color={"#fff"}
                  onPress={() => console.log("edit icon pressed")}
                />
              </View>
              <Text style={styles.tpaytitle}>Reach Us</Text>
            </View>
            <MaterialIcons
              name={"arrow-forward-ios"}
              size={25}
              color={"gray"}
              onPress={() => console.log("edit icon pressed")}
            />
          </View>
          <View style={styles.tpayidContainer}>
            <View style={styles.tpaytitleContainer}>
              <View
                style={[styles.tpaytitleIcon, { backgroundColor: "#EBA800" }]}
              >
                <MaterialIcons
                  name={"privacy-tip"}
                  size={25}
                  color={"#fff"}
                  onPress={() => console.log("edit icon pressed")}
                />
              </View>
              <Text style={styles.tpaytitle}>Privacy Policy</Text>
            </View>
            <MaterialIcons
              name={"arrow-forward-ios"}
              size={25}
              color={"gray"}
              onPress={() => console.log("edit icon pressed")}
            />
          </View>
          <View style={styles.tpayidContainer}>
            <View style={styles.tpaytitleContainer}>
              <View style={[styles.tpaytitleIcon, { backgroundColor: "gray" }]}>
                <MaterialIcons
                  name={"star-rate"}
                  size={25}
                  color={"#fff"}
                  onPress={() => console.log("edit icon pressed")}
                />
              </View>
              <Text style={styles.tpaytitle}>Rate Us</Text>
            </View>
            <MaterialIcons
              name={"arrow-forward-ios"}
              size={25}
              color={"gray"}
              onPress={() => console.log("edit icon pressed")}
            />
          </View>
        </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  accountDetailsContainer: {
    width: "100%",
    height: height * 0.4,
    marginTop: 20,
  },
  tpayidContainer: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
    borderRadius: 10,
    padding: 13,
    marginVertical: 5,
  },
  tpaytitleContainer: {
    width: "70%",
    flexDirection: "row",
  },
  tpaytitle: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    left: 10,
  },
  tpaytitleIcon: {
    backgroundColor: "#EBA800",
    borderRadius: 100,
    padding: 5,
  },

  header: {
    textTransform: "uppercase",
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#051852",
    fontWeight: "500",
  },

  id:{
    alignSelf:'center',
    fontSize:18,
    fontWeight:'500'
  }
});
