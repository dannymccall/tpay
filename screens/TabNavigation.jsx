import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import Gifts from "./auth/Gifts";
import Profile from "./auth/Profile";
import Menu from "./auth/Menu";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Gifts":
                iconName = "gift";
                break;
              case "Profile":
                iconName = "user";
                break;
              default:
                iconName = "home";
            }
            return <AntDesign name={iconName} size={30} color={color} />;
          },

          tabBarActiveTintColor: "#EBA800",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={() => {
            return {
              headerStyle: {
                backgroundColor: "#051852",
              },
              headerTintColor: "#fff",
            };
          }}
        />
        <Tab.Screen
          name="Gifts"
          component={Gifts}
          options={() => {
            return {
              headerStyle: {
                backgroundColor: "#051852",
              },
              headerTintColor: "#fff",
            };
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={() => {
            return {
              headerStyle: {
                backgroundColor: "#051852",
              },
              headerTintColor: "#fff",
            };
          }}
        />
      </Tab.Navigator>
    </>
  );
}
