import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Header from "../../Components/Header";

export default function Details(navigation) {
  const [userObj, setUserObj] = useState({
    fullName: "",
    nameOfInstitution: "",
    program: "",
    dob: "",
    admissionYear: "",
    graduationYear: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (
      userObj.fullName !== "" ||
      userObj.nameOfInstitution !== "" ||
      userObj.program !== "" ||
      userObj.dob !== "" ||
      userObj.admissionYear !== "" ||
      userObj.graduationYear !== ""
    )
      setDisable(false);
    console.log({ disable, userObj });
  }, [userObj]);
  return (
    <SafeAreaView>
      <Header headerText="Biodata" navigation={navigation} />
      <KeyboardAvoidingView
        style={{ height: "100%", backgroundColor: "#fff" }}
        keyboardVerticalOffset={100}
        enabled
        behavior="padding"
      >
        <ScrollView style={styles.container}>
          <Text style={styles.label}>Fullname</Text>
          <TextInput
            style={styles.input}
            placeholder="eg. Larbi Daniel Bekoe Palmer"
            value={userObj.fullName}
            onChangeText={(value) =>
              setUserObj({ ...userObj, fullName: value })
            }
          />
          <Text style={styles.label}>Name of Institution</Text>
          <TextInput
            style={styles.input}
            placeholder="eg. Kwame Nkrumah University of Science and Technology"
            value={userObj.nameOfInstitution}
            onChangeText={(value) =>
              setUserObj({ ...userObj, nameOfInstitution: value })
            }
          />
          <Text style={styles.label}>Program of Study</Text>
          <TextInput
            style={styles.input}
            placeholder="eg. Bsc. Computer Science"
            value={userObj.program}
            onChangeText={(value) => setUserObj({ ...userObj, program: value })}
          />
          <Text style={styles.label}>Date of birth</Text>
          <View style={styles.dobContainer}>
            <TextInput
              style={[styles.input, { width: "30%" }]}
              placeholder="Day"
              keyboardType="numeric"
              maxLength={2}
              onChangeText={(value) => {
                if (value.length == 2) setUserObj({ ...userObj, dob: value });
              }}
            />
            <TextInput
              style={[styles.input, { width: "30%" }]}
              placeholder="Month"
              keyboardType="numeric"
              maxLength={2}
              onChangeText={(value) => {
                if (value.length == 2)
                  setUserObj({ ...userObj, dob: `${userObj.dob}/${value}` });
              }}
            />
            <TextInput
              style={[styles.input, { width: "30%" }]}
              placeholder="Year"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(value) => {
                if (value.length == 4)
                  setUserObj({ ...userObj, dob: `${userObj.dob}/${value}` });
              }}
            />
          </View>
          <Text style={styles.label}>Year of admission</Text>
          <View style={styles.dobContainer}>
            <TextInput
              style={[styles.input, { width: "30%" }]}
              placeholder="Day"
              keyboardType="numeric"
              maxLength={2}
              onChangeText={(value) => {
                if (value.length == 2)
                  setUserObj({ ...userObj, admissionYear: value });
              }}
            />
            <TextInput
              style={[styles.input, { width: "30%" }]}
              placeholder="Month"
              keyboardType="numeric"
              maxLength={2}
              onChangeText={(value) => {
                if (value.length == 2)
                  setUserObj({
                    ...userObj,
                    admissionYear: `${userObj.admissionYear}/${value}`,
                  });
              }}
            />
            <TextInput
              style={[styles.input, { width: "30%" }]}
              placeholder="Year"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(value) => {
                if (value.length == 4)
                  setUserObj({
                    ...userObj,
                    admissionYear: `${userObj.admissionYear}/${value}`,
                  });
              }}
            />
          </View>
          <Text style={styles.label}>Year of graduation</Text>
          <View style={styles.dobContainer}>
            <TextInput
              style={[styles.input, { width: "30%" }]}
              placeholder="Day"
              keyboardType="numeric"
              maxLength={2}
              onChangeText={(value) => {
                if (value.length == 2)
                  setUserObj({
                    ...userObj,
                    graduationYear: `${userObj.graduationYear}/${value}`,
                  });
              }}
            />
            <TextInput
              style={[styles.input, { width: "30%" }]}
              placeholder="Month"
              keyboardType="numeric"
              maxLength={2}
              onChangeText={(value) => {
                if (value.length == 2)
                  setUserObj({
                    ...userObj,
                    graduationYear: `${userObj.graduationYear}/${value}`,
                  });
              }}
            />
            <TextInput
              style={[styles.input, { width: "30%" }]}
              placeholder="Year"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(value) => {
                if (value.length == 4)
                  setUserObj({
                    ...userObj,
                    graduationYear: `${userObj.graduationYear}/${value}`,
                  });
              }}
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueBtnDisabled} disabled>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "90%",
    alignSelf: "center",
    paddingVertical: 20,
    flex: 1,
  },
  label: {
    fontSize: 20,
    marginVertical: 15,
  },
  input: {
    width: "95%",
    height: 50,
    backgroundColor: "#fff",
    fontSize: 20,
    color: "#000",
    borderRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: "gray",
    shadowRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  dobContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  continueBtn: {
    backgroundColor: "#051852",
    width: "80%",
    alignSelf: "center",
    top: "10%",
    height: 35,
    borderRadius: 5,
  },
  continueBtnDisabled: {
    backgroundColor: "#DADADA",
    width: "80%",
    alignSelf: "center",
    top: "10%",
    height: 35,
    borderRadius: 5,
  },
  continueBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    top: "25%",
  },
});
