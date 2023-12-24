import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  Keyboard,
  SafeAreaView,
} from "react-native";
// import { storeData, getData } from "../../utils";
import ErrorMessageCard from "../../Components/ErrorMessageCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import OTP from '../../Components/OTP'
import { URL, storeInAsyncStorage, getItemFromAsyncStorage } from "../../utils";

const inputs = Array(4).fill("");
let newInputIndex = 0;

const isObjValid = (obj) => {
  return Object.values(obj).every((val) => val.trim());
};

const { width } = Dimensions.get("window");
const inputWidth = Math.round(width / 6);

export default function ConfirmPhoneNumber({ navigation, route }) {
  const { phoneNumber, verificationCode, authfunction } = route.params;

  const inputRef = React.useRef();
  const [OTP, setOTP] = React.useState({ 0: "", 1: "", 2: "", 3: "" });
  const [nextInputIndex, setNextInputIndex] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);

  let otpLength = [];
  let val = "";
  const handleChangeText = (text, index) => {
    otpLength.push(text);

    const newOTP = { ...OTP };
    newOTP[index] = text;
    setOTP(newOTP);

    const lastInputIndex = inputRef.length - 1;
    if (!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    setNextInputIndex(newInputIndex);
  };

  React.useEffect(() => {
    if (inputRef.current == null) return;
    else inputRef.current.focus();
  }, [nextInputIndex]);

  const onSumitConfirmNumber = async () => {
    Keyboard.dismiss();

    if (isObjValid(OTP)) {
      Object.values(OTP).forEach((v) => {
        val += v;
      });

      const response = await fetch(`${URL}/auth/verify-code`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: phoneNumber,
          code: val,
          verificationCode,
          authfunction,
        }),
      })
        .then((response) => response.json())
        .then(async (result) => {
          const {
            success,
            message,
            genId,
            savedPhoneRegistration,
            accessToken,
            verified,
          } = result;
            console.log(result)
          if (success) {
            val = "";
             storeInAsyncStorage("tpayid", genId);
             storeInAsyncStorage("accessToken", accessToken);
             storeInAsyncStorage("verified", JSON.stringify(verified));
             storeInAsyncStorage("isLoggedIn", JSON.stringify(true))
            navigation.navigate("Dashboard");
          } else {
            setErrorMessage(message);
            setShowErrorMessage(true);
          }
        });
    }
  };

  const handleClick = () => {
    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage ? (
        <ErrorMessageCard message={errorMessage} handleClick={handleClick} />
      ) : (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView>
            <View style={styles.backNavigationContainer}>
              <Ionicons
                name={"chevron-back"}
                size={20}
                color={"#fff"}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={styles.confirmationFormContainer}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: inputWidth / 3,
                  textAlign: "center",
                  bottom: inputWidth * 0.7,
                }}
              >
                Confirm Phone Number
              </Text>
              <Text style={styles.heading}>
                Please verify your phone number, a code has been sent to your
                phone number
              </Text>
              <View style={styles.OTPContainer}>
                {inputs.map((input, index) => {
                  return (
                    <View
                      key={index.toString()}
                      style={styles.confirmNumberContainer}
                    >
                      <TextInput
                        value={OTP[index]}
                        keyboardType="numeric"
                        maxLength={1}
                        style={styles.confirmNumber}
                        placeholder="0"
                        onChangeText={(text) => handleChangeText(text, index)}
                        ref={nextInputIndex === index ? inputRef : null}
                      />
                    </View>
                  );
                })}
              </View>
              <View style={{ alignItems: "center", top: inputWidth * 0.6 }}>
                <TouchableOpacity
                  style={styles.confirmNumberBotton}
                  onPress={onSumitConfirmNumber}
                  disabled={false}
                >
                  <Text style={styles.confirmNumberText}>Confirm Number</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: width / 25,
  },
  confirmationFormContainer: {
    top: "50%",
  },
  confirmNumberContainer: {
    width: inputWidth,
    height: inputWidth,
    backgroundColor: "#fff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
  },
  confirmNumber: {
    fontSize: 25,
    paddingHorizontal: 15,
  },
  OTPContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: inputWidth / 2,
  },

  confirmNumberBotton: {
    top: inputWidth * 0.09,
    backgroundColor: "#051852",
    width: width * 0.85,
    height: width * 0.18,
    borderRadius: 5,
  },

  confirmNumberText: {
    textAlign: "center",
    fontSize: inputWidth / 3,
    color: "#fff",
    top: inputWidth / 3,
    fontVariant: "600",
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
