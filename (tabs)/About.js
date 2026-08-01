import React from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView 
} from 'react-native';

export default function About() {
    const openGithubRepo = () => {
        const repoUrl = 'https://github.com/MorGu246/Expo_Go_Attendance_Project'; 
        Linking.openURL(repoUrl).catch((err) => 
            console.error('Failed to open link:', err)
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* כרטיס פרטי המפתח */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>👨‍💻 פרטי המפתח</Text>
                <Text style={styles.text}><Text style={styles.bold}>שם מלא:</Text> מור גואטה</Text>
                <Text style={styles.text}><Text style={styles.bold}>השכלה:</Text> מכללת כנרת</Text>
                <Text style={styles.text}><Text style={styles.bold}>מערכת:</Text> פרויקט שעון נוכחות</Text>
            </View>
            {/* כרטיס הסבר על המערכת */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>📱 על המערכת</Text>
                <Text style={styles.description}>
                    אפליקציה זו מיועדת לניהול ומעקב אחר משמרות עבודה. 
                    המערכת מאפשרת לדווח על כניסה ויציאה בלחיצת כפתור, לחשב את משך המשמרת באופן אוטומטי, ולצפות בהיסטוריית הדוחות המלאה בכל עת.
                </Text>
            </View>
            {/* כפתור פתיחת הריפו ב-GitHub */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>🔗 קוד המקור</Text>
                <Text style={styles.description}>
                    לצפייה בקוד המקור של הפרויקט ב-GitHub:
                </Text> 
                <TouchableOpacity style={styles.githubButton} onPress={openGithubRepo}>
                    <Text style={styles.githubButtonText}>🌐 פתח ריפו ב-GitHub</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        flexGrow: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 12,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 8,
    },
    text: {
        fontSize: 16,
        textAlign: 'right',
        color: '#444',
        marginBottom: 6,
    },
    bold: {
        fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        textAlign: 'right',
        color: '#555',
        lineHeight: 22,
        marginBottom: 12,
    },
    githubButton: {
        backgroundColor: '#24292e', // צבע תואם ל-GitHub
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 5,
    },
    githubButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});