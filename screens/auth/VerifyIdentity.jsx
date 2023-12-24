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
import { URL, getItemFromAsyncStorage, storeInAsyncStorage } from "../../utils";
const { width, height } = Dimensions.get("window");

export default function VerifyIdentity({ navigation }) {
  const [idNumber, setIdNumber] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [tpayid, settpayid] = React.useState("");

  const verifyCard = async () => {
    setIsSubmitting(true);
    console.log({ tpayid });
    const id = await getItemFromAsyncStorage("tpayid");
    console.log({ id });
    settpayid(id);
    console.log({ tpayid });
    fetch(`${URL}/auth/verify-id-card`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idNumber, tpayid: id }),
    })
      .then((response) => response.json())
      .then((result) => {
        setIsSubmitting(false);
        console.log(result);
        const { success, cardDetails } = result;
        if (success) {
          storeInAsyncStorage("verified", JSON.stringify(true));
          Alert.alert(
            "Identity Verification",
            "Please your idenity has been verified",
            [
              {
                text: "Ok",
                onPress: navigation.navigate("Dashboard"),
              },
            ]
          );
        } else {
          Alert.alert(
            "Identity Verification",
            "An error occured trying to verify your identity",
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
        <Header headerText="Verify your student email" navigation={navigation} />
        <KeyboardAvoidingView style={styles.section}>
          <View style={styles.article}>
            <View style={{ marginBottom: "40%" }}>
              <Text style={styles.inputTitle}>
                Student email
              </Text>
              <TextInput
                style={styles.input}
                value={idNumber}
                onChangeText={(value) => setIdNumber(value)}
                autoFocus
                placeholder="example@gmail.com"
              />
              {idNumber.length > 0 ? (
                <TouchableOpacity
                  style={
                    !isSubmitting
                      ? styles.verifyButton
                      : styles.verifyButtonDisabled
                  }
                  onPress={() => navigation.navigate('Details')}
                  disabled={!isSubmitting ? false : true}
                >
                  {!isSubmitting ? (
                    <Text style={styles.verifyButtonText}>Next</Text>
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
                  onPress={verifyCard}
                  disabled={true}
                >
                  <Text style={styles.verifyButtonText}>Next</Text>
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
    justifyContent: "center",
  },
  article:{
    width:'90%',
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
    fontWeight: "600",
    alignSelf: "center",
    top: "25%",
  },
});
