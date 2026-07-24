import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ייבוא הקומפוננטות הנפרדות
import CameraPicker from '../components/CameraPicker';
import GalleryPicker from '../components/GalleryPicker';

export default function ProfilePage() {
    const [myImg, setMyImg] = useState(null);
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('1234');

    useEffect(() => {
        loadProfileData();
    }, []);

    async function loadProfileData() {
        try {
            const savedImg = await AsyncStorage.getItem('user_profile_pic');
            if (savedImg) setMyImg(savedImg);

            const savedCreds = await AsyncStorage.getItem('user_credentials');
            if (savedCreds) {
                const parsed = JSON.parse(savedCreds);
                setUsername(parsed.username);
                setPassword(parsed.password);
            }
        } catch (error) {
            console.log("Error loading profile data", error);
        }
    }

    // פונקציה אחידה לטיפול בתמונה שנבחרה (מכל מקור שהוא)
    async function handleImagePicked(uri) {
        try {
            setMyImg(uri);
            await AsyncStorage.setItem('user_profile_pic', uri);
            Alert.alert("הצלחה", "תמונת הפרופיל עודכנה ונשמרה!");
        } catch (error) {
            Alert.alert("שגיאה", "נכשלה שמירת התמונה");
        }
    }

    async function saveCredentials() {
        if (!username.trim() || !password.trim()) {
            Alert.alert("שגיאה", "שם משתמש וסיסמה אינם יכולים להיות ריקים");
            return;
        }

        try {
            const creds = { username: username.trim(), password: password.trim() };
            await AsyncStorage.setItem('user_credentials', JSON.stringify(creds));
            Alert.alert("הצלחה", "פרטי הגישה עודכנו!");
        } catch (error) {
            Alert.alert("שגיאה", "נכשלה שמירת הפרטים");
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>פרופיל עובד</Text>

            <View style={styles.imageContainer}>
                {myImg ? (
                    <Image source={{ uri: myImg }} style={styles.profileImage} />
                ) : (
                    <View style={[styles.profileImage, styles.placeholderImage]}>
                        <Text style={{ color: '#aaa', fontSize: 16 }}>אין תמונה</Text>
                    </View>
                )}
            </View>

            {/* שימוש בקומפוננטות המופרדות */}
            <View style={styles.buttonRow}>
                <CameraPicker onImagePicked={handleImagePicked} />
                <GalleryPicker onImagePicked={handleImagePicked} />
            </View>

            <View style={styles.formCard}>
                <Text style={styles.sectionTitle}>עדכון פרטי התחברות</Text>

                <Text style={styles.label}>שם משתמש חדש:</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>סיסמה חדשה:</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />

                <TouchableOpacity onPress={saveCredentials} style={styles.saveBtn}>
                    <Text style={styles.saveBtnText}>שמור פרטים חדשים</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    imageContainer: { marginBottom: 15 },
    profileImage: { width: 150, height: 150, borderRadius: 75, borderWidth: 3, borderColor: '#5eacf9' },
    placeholderImage: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1e1e1' },
    buttonRow: { flexDirection: 'row', gap: 15, marginBottom: 25 },
    formCard: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 3 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'right', color: '#333' },
    label: { fontSize: 14, color: '#666', textAlign: 'right', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, textAlign: 'right', fontSize: 16 },
    saveBtn: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 5 },
    saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});