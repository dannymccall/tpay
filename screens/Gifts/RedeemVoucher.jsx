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
  Alert
} from "react-native";
import Header from "../../Components/Header";
import { URL, getItemFromAsyncStorage } from "../../utils";

const { width, height } = Dimensions.get("window");

export default function RedeemVoucher({navigation}) {
  const [gift, setGift] = React.useState({});
  const [voucher, setVoucher] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    async function fetchGift() {
      const key = await getItemFromAsyncStorage("tpayid");
      const response = await fetch(`${URL}/loan/get-gift?tpayid=${key}`);
      const result = await response.json();
      const { gift, voucher } = result;
      console.log(gift);
      setGift(gift);
    }

    fetchGift();
  }, []);

  const redeemGift = async () => {
    setIsSubmitting(true);

    const key = await getItemFromAsyncStorage("tpayid");
    const response = await fetch(`${URL}/loan/redeem-gift`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tpayid: key, voucher }),
    });

    const result = await response.json();
    const { success } = result;
    if (success) {
      setIsSubmitting(false);
      console.log({result})
      navigation.navigate("ShowGift", { gift: result.gift });
    }else{
        setIsSubmitting(false);
        Alert.alert(
            "Gift Redemption",
            "Please this voucher has already been redeemed",
            [
              {
                text: "RETRY",
              },
            ]
          );
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Header headerText="Redeem Gift" navigation={navigation}/>
        {gift ? (
          <View style={styles.voucherContainer}>
            <Text style={styles.title}>Your free voucher is:</Text>
            <Text style={styles.body}>{gift.voucher}</Text>
          </View>
        ) : (
          <View style={styles.voucherContainer}>
            <Text style={styles.title}>
              Please you do not have any free voucher
            </Text>
          </View>
        )}
        <KeyboardAvoidingView style={styles.section}>
          <View style={styles.mainSection}>
            <Text style={styles.redeemVoucherHeader}>Enter your voucher</Text>
            <TextInput
              style={styles.input}
              value={voucher}
              onChangeText={(value) => setVoucher(value)}
              autoFocus
              placeholder="Voucher"
            />
            {voucher.length > 0 ? (
              <TouchableOpacity
                style={
                  !isSubmitting
                    ? styles.verifyButton
                    : styles.verifyButtonDisabled
                }
                onPress={redeemGift}
                disabled={!isSubmitting ? false : true}
              >
                {!isSubmitting ? (
                  <Text style={styles.verifyButtonText}>Redeem</Text>
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
                onPress={redeemGift}
                disabled={true}
              >
                <Text style={styles.verifyButtonText}>Redeem</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  voucherContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "3%",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 5,
  },
  body: {
    fontSize: 18,
    fontWeight: "500",
    color: "#28A745",
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

  redeemVoucherHeader: {
    fontSize: 18,
    fontWeight: "500",
  },
});
