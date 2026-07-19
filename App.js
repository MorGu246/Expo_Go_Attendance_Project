import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, 
  Button, TouchableOpacity, Pressable, 
  Image, ImageBackground, Linking
  ,ScrollView, RefreshControl, FlatList,
  KeyboardAvoidingView, TouchableWithoutFeedback, Platform, TextInput, Keyboard, Alert, Modal,
  Animated
 } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{useState,useRef} from "react"
import WebView from 'react-native-webview';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { MyInput } from './LoginPage';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <MyInput></MyInput>
  );
}
// export function MyInput() {
//     let input2 = useRef(null);
//     let [myName, setMyName] = useState('')
//     let [myPass, setMyPass] = useState('')
//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <TouchableWithoutFeedback  //ככה כל נגיעה במסך תבטל את המקלדת
//                 onPress={()=>Keyboard.dismiss()}>
//                 <KeyboardAvoidingView // שהמקלדת לא תסתיר את האינפוט
//                     style={stylesInput.screen}
//                     behavior={Platform.OS == 'ios' ? 'padding' : 'height'} // מזהה מערכת הפעלה
//                     >
//                     <Text>MyInput</Text>
//                     <TextInput
//                     // returnKeyType='search' // מציג איך ייראה הכפתור של השליחה
//                         placeholder='your name...'
//                         // keyboardType='numeric'/'email-address' // /מייל מקלדת עם מספרים
//                         // secureTextEntry={true} //סיסמה
//                         //   editable={false}
//                         onSubmitEditing={()=>input2.current.focus()}
//                         value={myName}
//                         onChangeText={setMyName}
//                         style={stylesInput.input} />
//                     <TextInput
//                         ref={input2}
//                     // returnKeyType='search' // מציג איך ייראה הכפתור של השליחה
//                         placeholder='your password...'
//                         // keyboardType='numeric'/'email-address' // /מייל מקלדת עם מספרים
//                         secureTextEntry={true} //סיסמה
//                         //   editable={false}
//                         onSubmitEditing={()=>console.log("hello") //יפעיל את ה-ref בלחיצה - יעבור לאינפוט הבא
//                         }
//                         value={myPass}
//                         onChangeText={setMyPass}
//                         style={stylesInput.input} />
//                     {/* <TextInput
//                         multiline={true}
//                         style={stylesInput.input} /> */}
//                 </KeyboardAvoidingView>
//             </TouchableWithoutFeedback>
//         </SafeAreaView>
//     )
// }
// const stylesInput = StyleSheet.create({
//     input: {
//         width: "90%",
//         borderWidth: 1
//     },
//     screen: {
//         flex: 1,
//         justifyContent: "center"
//     }
// })

////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
