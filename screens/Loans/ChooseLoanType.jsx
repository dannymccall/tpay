import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import Header from "../../Components/Header";

const { width, height } = Dimensions.get("window");
console.log(width);
export default function LoanType({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Header headerText="Loan Type" navigation={navigation}/>

        <ScrollView style={{ width: "100%", height: "100%" }}>
          <View style={styles.mainArticle}>
            <Text style={styles.availableLoans}>Available Loans</Text>
            <View style={styles.loanTypeContainer}>
              <Text style={styles.loanTypeTitle}>Qwiq Loan</Text>
              <TouchableOpacity
                style={styles.loanTypeButton}
                onPress={() => navigation.navigate("LoanAmount", {
                  loanType: "QWIQ"
                })}
              >
                <Text style={styles.loanTypeButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loanTypeContainer}>
              <Text style={styles.loanTypeTitle}>Xpress Loan</Text>
              <TouchableOpacity style={styles.loanTypeButton}>
                <Text style={styles.loanTypeButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loanTypeContainer}>
              <Text style={styles.loanTypeTitle}>Ahomika Loan</Text>
              <TouchableOpacity style={styles.loanTypeButton}>
                <Text style={styles.loanTypeButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerContent: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.09,
    backgroundColor: "blue",
  },

  mainArticle: {
    width: "80%",
    alignSelf: "center",
    height: "100%",
    justifyContent: "space-evenly",
  },
  loanTypeContainer: {
    width: "100%",
    height: height * 0.17,
    backgroundColor: "#fff",
    shadowOffset: 0.2,
    shadowOpacity: 0.15,
    elevation: 1,
    shadowColor: "gray",
    shadowRadius: 10,
    borderRadius: 10,
    marginBottom: width * 0.2,
    justifyContent: "space-around",
    paddingHorizontal: "5%",
  },
  availableLoans: {
    fontSize: 25,
    fontWeight: "500",
    color: "gray",
    marginVertical: "10%",
  },
  loanTypeTitle: {
    fontSize: 25,
    fontWeight: "600",
  },

  loanTypeButton: {
    backgroundColor: "#051852",
    width: "30%",
    height: height * 0.045,
    borderRadius: 20,
    alignSelf: "flex-end",
  },

  loanTypeButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
    top: "25%",
  },
});
