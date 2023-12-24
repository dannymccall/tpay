import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProfileComponent from "../../Components/ProfileComponent";
import { storeInAsyncStorage } from "../../utils";

const { width, height } = Dimensions.get("window");

export default function Profile({navigation}) {

  const logout = async () => {
    await storeInAsyncStorage("tpayid",'');
    await storeInAsyncStorage("accessToken",'');
    await storeInAsyncStorage("verified",'');
    await storeInAsyncStorage('isLoggedIn', JSON.stringify(false))
    navigation.navigate('Welcome')
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/profileimage.png")}
              style={{
                width: 70,
                height: 70,
                bottom: "5%",
                left: width * 0.04,
                borderRadius: 100,
              }}
            />
            <View style={styles.editIcon}>
              <AntDesign
                name={"edit"}
                size={20}
                color={"#fff"}
                onPress={() => console.log("edit icon pressed")}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 20 }}>
              Daniel Palmer
            </Text>
            <Text>0504243525</Text>
          </View>
        </View>
        <ScrollView style={styles.scrollViewContainer}>
          <ProfileComponent />
          <TouchableOpacity
            onPress={logout}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
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

  profileContainer: {
    width: "100%",
    height: height * 0.17,
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    width: "25%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  editIcon: {
    backgroundColor: "#051852",
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
    top: height * 0.03,
  },

  scrollViewContainer: {
    width: "100%",
    height: "100%",
  },

  accountDetailsContainer: {
    width: "100%",
    height: height * 0.3,
    backgroundColor: "gold",
  },
  logoutBtn:{
    backgroundColor: "#051852", 
    padding: 13, 
    bottom: 10,
    alignSelf:'center',
    width:'95%',
    borderRadius:10,
    bottom:'3%'
  },
  logoutBtnText:{
    color:'#fff',
    alignSelf:'center',
    fontWeight:'500',
    fontSize:18
  }
});
