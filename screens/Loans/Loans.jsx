import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert
} from "react-native";
import Header from "../../Components/Header";
import { URL, getItemFromAsyncStorage } from "../../utils";

const { width, height } = Dimensions.get("window");
const headerHeight = height * 0.09;

export default function Loans({navigation}) {
  const [loans, setLoans] = React.useState();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    async function fetchLoans() {
      const key = await getItemFromAsyncStorage("tpayid");
      const response = await fetch(`${URL}/loan/get-loans?tpayid=${key}`);
      const result = await response.json();
      const { loan } = result;
      setLoans(loan);
    }

    fetchLoans();
  }, []);

  const payLoan = async () => {
    setIsSubmitting(true);
    const key = await getItemFromAsyncStorage("tpayid");
    const response = await fetch(`${URL}/loan/pay-loans`, {
      method:'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({tpayid: key})
    });;
    const result = await response.json();
    console.log(result)
    const {success, message} = result;
    if(success){
      setIsSubmitting(false);
      Alert.alert(
        "Loan Payment",
        message,
        [
          {
            text: "OK",
            onPress:navigation.navigate('Dashboard')
          },
        ]
      );
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Header headerText="Payoff Loan" navigation={navigation}/>
        <View style={styles.section}>
          {loans ? (
            <View style={styles.mainSection}>
              <Text style={styles.header}>Loan arreas</Text>
              <View style={styles.details}>
                <Text style={[styles.title, { marginRight: 10 }]}>
                  Days Left:
                </Text>
                <Text style={styles.body}>{loans.duration}</Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.title, { marginRight: 10 }]}>
                  Loan Type:
                </Text>
                <Text style={styles.body}>{loans.loantype} Loan</Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.title, { marginRight: 10 }]}>
                  Loan Amount:
                </Text>
                <Text style={styles.body}>{loans.loanamount}</Text>
              </View>
              <View style={styles.details}>
                <Text style={[styles.title, { marginRight: 10 }]}>
                  Loan Status:
                </Text>
                <Text style={styles.body}>{loans.loanstatus}</Text>
              </View>

              <TouchableOpacity
                style={
                  !isSubmitting
                    ? styles.verifyButton
                    : styles.verifyButtonDisabled
                }
                onPress={payLoan}
                disabled={!isSubmitting ? false : true}
              >
                {!isSubmitting ? (
                  <Text style={styles.verifyButtonText}>Pay off</Text>
                ) : (
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={{ top: height * 0.017 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.mainSection}>
              <Text style={[styles.title]}>No loan payment available for you </Text>
            </View>
          )}
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
    alignItems: "center",
  },
  mainSection: {
    width: "80%",
    height: height * 0.3,
    backgroundColor: "#fff",
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
    shadowOffset: 0.4,
    alignSelf: "center",
    top: height * 0.25,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: "500",
  },

  details: {
    flexDirection: "row",
    marginVertical: 7,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  body: {
    fontSize: 18,
  },

  verifyButton: {
    width: "40%",
    height: height * 0.05,
    backgroundColor: "#051852",
    shadowOffset: 0.4,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  verifyButtonDisabled: {
    marginTop: 10,
    width: "40%",
    height: height * 0.05,
    backgroundColor: "#DADADA",
    shadowOffset: 0.4,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
    borderRadius: 10,
  },

  verifyButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
    top: "25%",
  },
});
