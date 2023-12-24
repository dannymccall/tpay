import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { URL, getItemFromAsyncStorage } from "../../utils";

const { width, height } = Dimensions.get("window");


export default function Menu({ route,navigation }) {
  const [authorized, setAuthorized] = React.useState(false);
  const [loans, setLoans] = React.useState({});

  
  React.useEffect(() => { 
      async function getData() {
        const key = await getItemFromAsyncStorage("verified");
        const id = await getItemFromAsyncStorage("tpayid");
        setAuthorized(JSON.parse(key));
  
        const userResponse = await fetch(`${URL}/auth/get-user-details?tpayid=${id}`);
        const userResult = await userResponse.json();
        const {user} = userResult;
        isVerified = user.verified;
       
  
        const response = await fetch(`${URL}/loan/get-loans?tpayid=${id}`);
        const result = await response.json();
        const { loan } = result;
        setLoans(loan);
      }

      getData();
  }, []);

  checkNavigation = () => {
    console.log(Object.entries(loans).length);
    if (authorized && Object.entries(loans).length == 0) {
      navigation.navigate("LoanType");
    } else if (Object.entries(loans).length > 0) {
      Alert.alert(
        "Not Authorized",
        "Please pay your loan arreas before applying for new one",
        [
          {
            text: "OK",
          },
        ]
      );
    } else navigation.navigate("VerifyIdentity");
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.section}>
          {!authorized && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>
                Complete your profile to access the loan portal
              </Text>
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={() => navigation.navigate("VerifyIdentity")}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Complete your identity
                </Text>
                <Entypo
                  name={"arrow-long-right"}
                  size={25}
                  color={"#fff"}
                  onPress={() => navigation.navigate("VerifyIdentity")}
                  style={{ bottom: 4,left:10 }}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.article}>
            <Text style={styles.articleTitle}>
              Apply for loans and win amazing gift by paying your loans on time
              !!!
            </Text>
          </View>
          <ScrollView>
            <View style={styles.mainSection}>
              <View style={styles.mainSectionInfo}>
                <Text style={styles.mainSectionHeader}>Apply for loan</Text>
                {authorized == "NO" && (
                  <Text>
                    Please, verify your identity to access the loan portal
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.applyNow}
                onPress={checkNavigation}
              >
                <Text style={styles.applyNowButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainSection}>
              <View style={styles.mainSectionInfo}>
                <Text style={styles.mainSectionHeader}>Pay off loan</Text>

                <Text>
                  Please, pay off your loan to get access to more loans
                </Text>
              </View>
              <TouchableOpacity
                style={styles.applyNow}
                onPress={() => navigation.navigate("Loans")}
              >
                <Text style={styles.applyNowButtonText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainSection}>
              <View style={styles.mainSectionInfo}>
                <Text style={styles.mainSectionHeader}>Redeem Voucher</Text>

                <Text>Please redeem your voucher and enjoy your gift</Text>
              </View>
              <TouchableOpacity
                style={styles.applyNow}
                onPress={() => navigation.navigate("RedeemVoucher")}
              >
                <Text style={styles.applyNowButtonText}>Redeem Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    width: "100%",
    height: "100%",
  },

  infoContainer: {
    width: "100%",
    height: width * 0.25,
    backgroundColor: "#051852",
    justifyContent: "space-around",
  },

  infoTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    left: width * 0.02,
  },
  verifyButton: {
    width: "40%",
    left: width * 0.02,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  mainSection: {
    width: "80%",
    height: height * 0.25,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: "10%",
    shadowOffset: 0.2,
    shadowOpacity: 0.15,
    elevation: 1,
    shadowColor: "gray",
    shadowRadius: 10,
    borderRadius: 5,
    justifyContent: "space-around",
    bottom: "9%",
  },

  mainSectionInfo: {
    width: "100%",
    paddingHorizontal: 10,
  },

  mainSectionHeader: {
    fontSize: 27,
    fontWeight: "500",
    marginVertical: "1%",
  },

  applyNow: {
    backgroundColor: "#051852",
    width: "40%",
    height: height * 0.05,
    alignSelf: "flex-end",
    right: "5%",
    borderRadius: 20,
  },

  applyNowButtonText: {
    color: "#fff",
    top: "25%",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  article: {
    width: "80%",
    height: height * 0.09,
    alignSelf: "center",
    paddingVertical: "4%",
    marginBottom:10,
    shadowOffset: 0.2,
    shadowOpacity: 0.15,
    elevation: 1,
    shadowColor: "gray",
    shadowRadius: 10,
    backgroundColor:'#fff'
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "500"
  },
});
