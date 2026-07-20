import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, SafeAreaProvider } from 'react-native';
// ייבוא המסכים שלך
import MyEntrance from './(tabs)/entrance';
import MyExit from './(tabs)/exit';

export default function MainApp({ onLogout }) {
    // סטייט לניהול הטאב הפעיל ('entrance' או 'exit')
    const [activeTab, setActiveTab] = useState('entrance');

    return (
        <SafeAreaView style={styles.container}>
            {/* חלק 1: האזור הראשי שמציג את התוכן */}
            <View style={styles.content}>
                {activeTab === 'entrance' ? <MyEntrance /> : <MyExit />}
            </View>

            {/* חלק 2: תפריט כפתורים תחתון (The Tabs) */}
            <View style={styles.tabBar}>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'entrance' && styles.activeTab]} 
                    onPress={() => setActiveTab('entrance')}
                >
                    <Text style={styles.tabText}>כניסה</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'exit' && styles.activeTab]} 
                    onPress={() => setActiveTab('exit')}
                >
                    <Text style={styles.tabText}>יציאה</Text>
                </TouchableOpacity>

                {/* כפתור התנתקות פשוט כדי לחזור ללוגין (אופציונלי) */}
                <TouchableOpacity 
                    style={styles.tabButton} 
                    onPress={onLogout}
                >
                    <Text style={[styles.tabText, {color: 'red'}]}>התנתק</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1, // תופס את כל הגובה שמעל לתפריט
    },
        tabBar: {
        flexDirection: 'row',
        height: 85, // הגדלנו מ-60 ל-85 כדי לתת יותר גובה
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#f9f9f9',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 15, // מוסיף מרווח בתחתית כדי שהטקסט לא ייחתך בגלל הפס של האייפון/אנדרואיד
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // ממרכז את הטקסט אנכית בתוך הכפתור
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: 'blue', // סימון לטאב פעיל
    },
});