import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootStack from './RootStack';
import ErrorMessageCard from './Components/ErrorMessageCard';
import SuccessMessageCard from './Components/SuccessMessageCard'
import DashBoard from './screens/auth/Dashboard';
import Details from './screens/auth/Details';
import Picture from './screens/auth/Camera';
export default function App() {
  return (
    //  <RootStack />
    //  <DashBoard />
    // <SuccessMessageCard message="Hello"/>
    // <Details />
    <Picture />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
