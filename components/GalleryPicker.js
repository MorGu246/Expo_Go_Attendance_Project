import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function GalleryPicker({ onImagePicked }) {
    async function openGallery() {
        let res = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!res.granted) {
            Alert.alert("חייב לאשר גישה לגלריה");
            return;
        }
        let pic = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!pic.canceled && pic.assets && pic.assets.length > 0) {
            onImagePicked(pic.assets[0].uri);
        }
    }

    return (
        <TouchableOpacity onPress={openGallery} style={styles.btn}>
            <Text style={styles.btnText}>🖼️ גלריה</Text>
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