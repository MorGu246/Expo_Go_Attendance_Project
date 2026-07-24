import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  KeyboardAvoidingView, TouchableWithoutFeedback, Platform, TextInput, Keyboard, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ onLoginSuccess }) { 
    let input2 = useRef(null);
    let [myName, setMyName] = useState('');
    let [myPass, setMyPass] = useState('');

    const handleLogin = async () => {
        if (!myName.trim() || !myPass.trim()) {
            Alert.alert("שגיאה", "אנא הזן שם משתמש וסיסמה");
            return;
        }

        try {
            // שליפת הפרטים שנשמרו דרך מסך הפרופיל
            const savedCreds = await AsyncStorage.getItem('user_credentials');
            
            // ברירות המחדל המקוריות שלך
            let curName = 'kinneret';
            let curPass = '1234';

            // אם קיימים פרטים מעודכנים בזיכרון, ישתמש בהם
            if (savedCreds !== null) {
                const parsed = JSON.parse(savedCreds);
                curName = parsed.username;
                curPass = parsed.password;
            }

            // אימות הפרטים
            if (myName.trim() === curName && myPass.trim() === curPass) {
                if (onLoginSuccess) onLoginSuccess();
            } else {
                Alert.alert("שגיאה", "שם משתמש או סיסמה שגויים. נסה שוב.");
            }
        } catch (error) {
            console.log("Error logging in:", error);
            Alert.alert("שגיאה", "אירעה שגיאה במהלך ההתחברות");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView 
                    style={stylesInput.screen}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Text style={stylesInput.title}>התחברות למערכת</Text>
                    
                    <TextInput
                        placeholder='your name...'
                        onSubmitEditing={() => input2.current.focus()}
                        value={myName}
                        onChangeText={setMyName}
                        style={stylesInput.input} 
                        autoCapitalize="none"
                    />
                    
                    <TextInput
                        ref={input2}
                        placeholder='your password...'
                        secureTextEntry={true} 
                        onSubmitEditing={handleLogin}
                        value={myPass}
                        onChangeText={setMyPass}
                        style={stylesInput.input} 
                    />

                    <TouchableOpacity style={stylesInput.btn} onPress={handleLogin}>
                        <Text style={stylesInput.btnText}>התחבר</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const stylesInput = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    input: {
        width: "90%",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        fontSize: 16
    },
    btn: {
        width: "90%",
        backgroundColor: "rgb(94, 172, 249)",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18
    }
});