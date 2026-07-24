import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraPicker({ onImagePicked }) {
    async function openCamera() {
        let res = await ImagePicker.requestCameraPermissionsAsync();
        if (!res.granted) {
            Alert.alert("חייב לתת אישור למצלמה");
            return;
        }
        let pic = await ImagePicker.launchCameraAsync({
            // allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!pic.canceled && pic.assets && pic.assets.length > 0) {
            onImagePicked(pic.assets[0].uri);
        }
    }

    return (
        <TouchableOpacity onPress={openCamera} style={styles.btn}>
            <Text style={styles.btnText}>📷 מצלמה</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "rgb(94, 172, 249)",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});