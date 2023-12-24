import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import ErrorMessageCard from "../../Components/ErrorMessageCard";
import Ionicons from "@expo/vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// const DismissKeyboard = ({ children }) => {
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
//     {children}
//   </TouchableWithoutFeedback>;
// };

export default function Register({ route, navigation }) {
  const [number, setNumber] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const useRef = React.useRef(0);

  const { authfunction } = route.params;
  const onSumitPhoneNumber = async () => {
    setIsSubmitting(true);
    const response = await fetch("http://172.20.10.3:8080/auth/register-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number, authfunction }),
    });
    const result = await response.json();
    const { success, verificationCode, phoneNumber } = result;
    console.log(result);
    if (success) {
      setIsSubmitting(false);
      setNumber("");
      navigation.navigate("ConfirmPhoneNumber", {
        phoneNumber,
        verificationCode,
        authfunction,
      });
    } else {
      const { success, message } = result;
      setErrorMessage(message);
      setShowErrorMessage(true);
      setIsSubmitting(false);
    }
  };
  const handleClick = () => {
    setShowErrorMessage(false);
  };

  React.useEffect(() => {
    useRef.current = useRef.current + 1;
  });

  return (
    <>
      {showErrorMessage ? (
        <ErrorMessageCard message={errorMessage} handleClick={handleClick} />
      ) : (
        <>
          <SafeAreaView style={styles.container}>
            <View style={styles.backNavigationContainer}>
              <Ionicons
                name={"chevron-back"}
                size={20}
                color={"#fff"}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={styles.registerSection}>
              <View style={styles.mainSection}>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: windowWidth * 0.07,
                    marginBottom: windowHeight * 0.02,
                  }}
                >
                  Enter your phone number
                </Text>
                <View style={{ textAlign: "center", width: windowWidth * 0.8 }}>
                  <Text style={{ textAlign: "center" }}>
                    Please confirm your phone number to recieve one time code
                  </Text>
                </View>
                <View
                  style={{ top: windowHeight * 0.05, flexDirection: "row" }}
                >
                  <View style={styles.country}>
                    <Text
                      style={{
                        top: windowHeight * 0.023,
                        left: windowWidth * 0.03,
                        fontSize: windowWidth * 0.06,
                      }}
                    >
                      +233
                    </Text>
                  </View>

                  <TextInput
                    style={styles.numberInput}
                    autoFocus
                    placeholder="0244444546"
                    keyboardType="numeric"
                    value={number}
                    onChangeText={(number) => setNumber(number)}
                    maxLength={10}
                  />
                </View>
                {number.length == 10 ? (
                  <TouchableOpacity
                    style={
                      !isSubmitting
                        ? styles.numberButton
                        : styles.numberButtonDisable
                    }
                    onPress={onSumitPhoneNumber}
                    disabled={!isSubmitting ? false : true}
                  >
                    {!isSubmitting ? (
                      <Text style={styles.numberBottonText}>Continue</Text>
                    ) : (
                      <ActivityIndicator
                        size="large"
                        color="#fff"
                        style={{ top: windowHeight * 0.017 }}
                      />
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.numberButtonDisable}
                    onPress={onSumitPhoneNumber}
                    disabled={true}
                  >
                    <Text style={styles.numberBottonText}>Continue</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  registerSection: {
    backgroundColor: "#fff",
    paddingTop: windowHeight * 0.15,
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },

  mainSection: {
    alignItems: "center",
  },

  country: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.07,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 5,
    shadowOffset: 0.4,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
  },

  numberInput: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.07,
    backgroundColor: "#fff",
    fontSize: windowWidth * 0.06,
    color: "#000",
    paddingTop: windowHeight * 0.002,
    paddingLeft: windowWidth * 0.03,
    left: windowWidth * 0.02,
    borderRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
  },

  numberButton: {
    top: windowHeight * 0.09,
    backgroundColor: "#051852",
    width: windowWidth * 0.85,
    height: windowHeight * 0.08,
    borderRadius: 5,
  },
  numberButtonDisable: {
    top: windowHeight * 0.09,
    backgroundColor: "#DADADA",
    width: windowWidth * 0.85,
    height: windowHeight * 0.08,
    borderRadius: 5,
  },

  numberBottonText: {
    textAlign: "center",
    fontSize: windowWidth * 0.075,
    color: "#fff",
    top: "25%",
  },
  backNavigationContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#051852",
    borderRadius: "100%",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});
