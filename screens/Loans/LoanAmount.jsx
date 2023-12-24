import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Header from "../../Components/Header";
import { URL,getItemFromAsyncStorage, storeInAsyncStorage } from "../../utils";
const { width, height } = Dimensions.get("window");

export default function VerifyIdentity({ navigation, route }) {
  const [loanamount, setLoanamount] = React.useState("");
  const [wallatnumber, setwallatnumber] = React.useState("");
  const [user, setUser] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [tpayid, settpayid] = React.useState("");

  const {loanType} = route.params;

  const applyForLoan = async () => {
  console.log({loanType})
    setIsSubmitting(true);
    console.log({tpayid})
    const tpayid = await getItemFromAsyncStorage("tpayid");
    settpayid(tpayid);

    fetch(`${URL}/loan/request-loan`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tpayid, loantype:loanType, loanamount }),
    })
      .then((response) => response.json())
      .then((result) => {
        setIsSubmitting(false);
        console.log(result)
        const { success, newLoan } = result;
        if (success) {
          Alert.alert(
            "Loan Request",
            "Please your loan request has been approved, you will receive the money in your mobile money wallet",
            [
              {
                text: "Ok",
                onPress: navigation.navigate("Dashboard"),
              },
            ]
          );
        } else {
          setIsSubmitting(false);
          Alert.alert(
            "Loan Request",
            "An error occured in processing your request for loan",
            [
              {
                text: "Retry",
              },
            ]
          );
        }
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Header headerText="Loan Amount" navigation={navigation}/>
        <KeyboardAvoidingView style={styles.section}>
          <Text>{user}</Text>
          <View style={styles.loanAmountContainer}>
            <View>
              <Text style={styles.inputTitle}>
                Enter loan amount
              </Text>
              <TextInput
                style={styles.input}
                value={loanamount}
                onChangeText={(value) => setLoanamount(value)}
                autoFocus
                placeholder="2000"
                keyboardType="numeric"
              />
              <Text style={styles.inputTitle}>
                Enter wallat number
              </Text>
              <TextInput
                style={styles.input}
                value={wallatnumber}
                onChangeText={(value) => setwallatnumber(value)}
                placeholder="0504243525"
                keyboardType="numeric"
                maxLength={10}
              />
              {loanamount.length > 0 && wallatnumber.length ==10 ? (
                <TouchableOpacity
                  style={
                    !isSubmitting
                      ? styles.verifyButton
                      : styles.verifyButtonDisabled
                  }
                  onPress={applyForLoan}
                  disabled={!isSubmitting ? false : true}
                >
                  {!isSubmitting ? (
                    <Text style={styles.verifyButtonText}>Apply loan</Text>
                  ) : (
                    <ActivityIndicator
                      size="large"
                      color="#fff"
                      style={{ top: height * 0.017 }}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.verifyButtonDisabled}
                  onPress={applyForLoan}
                  disabled={true}
                >
                  <Text style={styles.verifyButtonText}>Apply Loan</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
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
    flex: 1,
    alignItems: "center",
  },
  loanAmountContainer:{
    marginBottom: "40%",
    width:'80%',
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
    borderRadius: 5,
    backgroundColor:'#fff',
    padding:30,
    top:height * 0.07
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
    borderRadius: 5,
    marginVertical: 20,
    fontSize: 20,
    paddingHorizontal: 20,
  },

  verifyButton: {
    width: "100%",
    height: height * 0.065,
    backgroundColor: "#051852",
    shadowOffset: 0.4,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
    borderRadius: 10,
  },
  verifyButtonDisabled: {
    width: "100%",
    height: height * 0.065,
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
    fontWeight: "500",
    alignSelf: "center",
    top: "25%",
  },
});
