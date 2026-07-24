// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, 
  Button, TouchableOpacity, Pressable, 
  Image, ImageBackground, Linking
  ,ScrollView, RefreshControl, FlatList,
  KeyboardAvoidingView, TouchableWithoutFeedback, Platform, TextInput, Keyboard, Alert, Modal,
  Animated
 } from 'react-native';
// import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React,{useState,useRef} from "react"
// import WebView from 'react-native-webview';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LottieView from 'lottie-react-native';
import MainApp from './MainApp';
import LoginPage from './LoginPage';

export default function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <MainApp onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
  );
}

////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
