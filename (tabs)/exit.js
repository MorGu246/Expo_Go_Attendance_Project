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
//import { MyInput } from './LoginPage';

export default function MyExit() {
    let myAnim = useRef(new Animated.Value(1)).current;
    
        function myFuncIn() {
            Animated.spring(myAnim, {
                toValue: 0.3, 
                useNativeDriver: true
            }).start()
        }
    
        function myFuncOut() {
            Animated.spring(myAnim, {
                toValue: 1,
                friction: 2, 
                useNativeDriver: true
            }).start()
        }
    
        return (
            <SafeAreaView style={styles.screen}>
                {/* activeOpacity={1} מבטל את עמעום ברירת המחדל של האצבע, כדי שיראו רק את הקפיץ שלנו */}
                <TouchableOpacity onPressIn={myFuncIn} onPressOut={myFuncOut} activeOpacity={1}>
                    <Animated.View style={[styles.btn, { transform: [{ scale: myAnim }] }]}>
                        <Text style={styles.txt}>יציאה</Text>
                    </Animated.View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        txt: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#000'
        },
        btn: {
            paddingVertical: 15,
            paddingHorizontal: 40,
            backgroundColor: "rgb(174, 210, 247)",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center"
        }
    })