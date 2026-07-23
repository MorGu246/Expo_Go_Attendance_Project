import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ייבוא מסך הדוחות החדש שיצרנו (בהנחה ששניהם באותה תיקייה)
import ReportsPage from './(tabs)/Reports'; 

export default function MainApp({ onLogout }) {
    const [activeTab, setActiveTab] = useState('clock');
    const [isEntranceMode, setIsEntranceMode] = useState(true);
    const buttonAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        async function checkActiveShift() {
            try {
                const savedEntry = await AsyncStorage.getItem('current_entry');
                if (savedEntry !== null) setIsEntranceMode(false);
            } catch (error) {
                console.log(error);
            }
        }
        checkActiveShift();
    }, []);

    function handlePressIn() {
        Animated.spring(buttonAnim, { toValue: 0.85, useNativeDriver: true }).start();
    }

    async function handlePressOut() {
        Animated.spring(buttonAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
        const now = new Date();

        try {
            if (isEntranceMode) {
                await AsyncStorage.setItem('current_entry', now.toISOString());
                Alert.alert("שעון נוכחות", `נרשמה כניסה בשעה: ${now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}`);
                setIsEntranceMode(false);
            } else {
                const entryTimeStr = await AsyncStorage.getItem('current_entry');
                if (entryTimeStr !== null) {
                    const entryTime = new Date(entryTimeStr);
                    const diffMs = now - entryTime;
                    const totalMinutes = Math.floor(diffMs / (1000 * 60));
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    const durationStr = `${hours} שעות ו-${minutes} דקות`;

                    const newShift = {
                        id: now.getTime().toString(),
                        date: entryTime.toLocaleDateString('he-IL'),
                        entry: entryTime.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
                        exit: now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
                        duration: durationStr
                    };

                    const existingHistory = await AsyncStorage.getItem('shift_history');
                    let historyArray = existingHistory ? JSON.parse(existingHistory) : [];
                    historyArray.push(newShift);
                    
                    await AsyncStorage.setItem('shift_history', JSON.stringify(historyArray));
                    await AsyncStorage.removeItem('current_entry');

                    Alert.alert("שעון נוכחות", `נרשמה יציאה. משך המשמרת: ${durationStr}`);
                }
                setIsEntranceMode(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                
                {/* טאב 1: שעון נוכחות */}
                {activeTab === 'clock' && (
                    <View style={styles.centerScreen}>
                        <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={1}>
                            <Animated.View style={[styles.actionButton, { transform: [{ scale: buttonAnim }] }, isEntranceMode ? styles.btnEntrance : styles.btnExit]}>
                                <Text style={styles.buttonText}>{isEntranceMode ? 'כניסה' : 'יציאה'}</Text>
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                )}

                {/* טאב 2: רינדור ישיר של מסך הדוחות העצמאי */}
                {activeTab === 'reports' && <ReportsPage />}

            </View>

            {/* תפריט ניווט תחתון */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'clock' && styles.activeTab]} onPress={() => setActiveTab('clock')}>
                    <Text style={styles.tabText}>שעון נוכחות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'reports' && styles.activeTab]} onPress={() => setActiveTab('reports')}>
                    <Text style={styles.tabText}>דוחות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={onLogout}>
                    <Text style={[styles.tabText, { color: 'red' }]}>התנתק</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { flex: 1 },
    centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    actionButton: {
        paddingVertical: 20, paddingHorizontal: 50, borderRadius: 20,
        justifyContent: 'center', alignItems: 'center', elevation: 5,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
    },
    btnEntrance: { backgroundColor: 'rgb(174, 210, 247)' },
    btnExit: { backgroundColor: 'rgb(255, 148, 148)' },
    buttonText: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
    tabBar: { flexDirection: 'row', height: 85, width: '100%', borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#f9f9f9', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 15 },
    tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
    tabText: { fontSize: 16, fontWeight: '500' },
    activeTab: { borderBottomWidth: 3, borderBottomColor: 'blue' },
});