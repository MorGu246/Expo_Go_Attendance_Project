import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, 
  Button, TouchableOpacity, Pressable, 
  Image, ImageBackground, Linking
  ,ScrollView, RefreshControl, FlatList,
  KeyboardAvoidingView, TouchableWithoutFeedback, Platform, TextInput, Keyboard, Alert, Modal,
  Animated
 } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React,{useState,useRef} from "react"
import WebView from 'react-native-webview';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { MyInput } from './LoginPage';
import MainApp from './MainApp'; // הקומפוננטה החדשה שיצרנו בשלב 2

export default function App() {
  // סטייט לניהול מצב ההתחברות (ברירת מחדל: לא מחובר)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // פונקציה שתופעל כשהלוגין מצליח
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  // פונקציה להתנתקות (כדי לחזור ללוגין)
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    // <MyInput></MyInput>
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {/* רינדור מותנה: אם מחובר מציג את האפליקציה, אחרת את הלוגין */}
        {isLoggedIn ? (
          // מציג את ה-Tabs. מעביר לו פונקציית התנתקות.
          <MainApp onLogout={handleLogout} />
        ) : (
          // מציג את מסך הלוגין. מעביר לו את הפונקציה שתופעל בהצלחה.
          <MyInput onLoginSuccess={handleLoginSuccess} />
        )}
      </View>
    </SafeAreaProvider>
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
