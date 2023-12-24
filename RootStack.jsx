import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Welcome from "./screens/Welcome";
import Register from "./screens/auth/Register";
import ConfirmPhoneNumber from "./screens/auth/ConfirmPhoneNumber";
import DashBoard from "./screens/auth/Dashboard";
import LoanType from "./screens/Loans/ChooseLoanType";
import VerifyIdentity from "./screens/auth/VerifyIdentity";
import LoanAmount from "./screens/Loans/LoanAmount";
import Loans from "./screens/Loans/Loans";
import RedeemVoucher from "./screens/Gifts/RedeemVoucher";
import ShowGift from "./screens/Gifts/ShowGift";
import Details from './screens/auth/Details'
import { getItemFromAsyncStorage } from "./utils";

const Stack = createNativeStackNavigator();

export default function RootStack({ navigation, route }) {
  const [tpayid, settpayid] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      const key = await getItemFromAsyncStorage("tpayid");
      const keepLoggedIn = await getItemFromAsyncStorage("isLoggedIn");

      setIsLoggedIn(JSON.parse(keepLoggedIn));
      console.log({ isLoggedIn });
      if (key !== "") {
        settpayid(key);
        console.log({ tpayid });
      }
    }
    getData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen
              name="Dashboard"
              component={DashBoard}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={Home}
              options={() => {
                return {
                  headerStyle: {
                    backgroundColor: "#051852",
                  },
                  headerTintColor: "#fff",
                };
              }}
            />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ConfirmPhoneNumber"
              component={ConfirmPhoneNumber}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoanType"
              component={LoanType}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="VerifyIdentity"
              component={VerifyIdentity}
              options={{ headerShown: false }}
            />
             <Stack.Screen
            name="Dashboard"
            component={DashBoard}
            options={{ headerShown: false }}
          />
            <Stack.Screen
              name="LoanAmount"
              component={LoanAmount}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Loans"
              component={Loans}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RedeemVoucher"
              component={RedeemVoucher}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShowGift"
              component={ShowGift}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
