import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItemFromAsyncStorage =  (key) => {
  return  AsyncStorage.getItem(key);
};

export const storeInAsyncStorage = (key, value) => {
  return  AsyncStorage.setItem(key, value);
};

export const removeKeyFromAsyncStorage = (key) => {
  return  AsyncStorage.removeItem(key);
};

const URL = "http://172.20.10.3:8080";


module.exports = { storeInAsyncStorage, getItemFromAsyncStorage, URL };
