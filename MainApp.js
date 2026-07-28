import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Alert, Dimensions, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ReportsPage from './(tabs)/Reports'; 
import ProfilePage from './(tabs)/ProfilePage';
import About from './(tabs)/About';

import { useRouter } from 'expo-router';
import NotFoundScreen from './app/+not-found';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function MainApp({ onLogout }) {
    const [activeTab, setActiveTab] = useState('clock');
    const [isEntranceMode, setIsEntranceMode] = useState(true);
    const buttonAnim = useRef(new Animated.Value(1)).current;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

    const router = useRouter();

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

    function toggleDrawer(open) {
        setIsDrawerOpen(open);
        Animated.timing(drawerAnim, {
            toValue: open ? SCREEN_WIDTH * 0.3 : SCREEN_WIDTH,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }
    function navigateFromDrawer(tab) {
        setActiveTab(tab);
        toggleDrawer(false);
    }
    function handlePressIn() {
        Animated.spring(buttonAnim, { toValue: 0.85, useNativeDriver: true }).start();
    }
    async function handlePressOut() {
        Animated.spring(buttonAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
        const now = new Date();

        try {
            if (isEntranceMode) {
                await AsyncStorage.setItem('current_entry', now.toISOString());
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
                }
                setIsEntranceMode(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" hidden={false} translucent={false} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => toggleDrawer(true)} style={styles.hamburgerBtn}>
                    <Text style={styles.hamburgerText}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>שעון נוכחות</Text>
            </View>

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
                {activeTab === 'reports' && <ReportsPage />   }
                {activeTab === 'profile' && <ProfilePage />   }
                {activeTab === 'about'   && <About />         }
                {activeTab === 'notFound'&& <NotFoundScreen 
                 onGoBack={() => setActiveTab('clock')} />    }
            </View>

            {/* תפריט ניווט תחתון */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'clock' && styles.activeTab]} onPress={() => setActiveTab('clock')}>
                    <Text style={styles.tabText}>שעון</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.tabButton, activeTab === 'reports' && styles.activeTab]} onPress={() => setActiveTab('reports')}>
                    <Text style={styles.tabText}>דוחות</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={[styles.tabButton, activeTab === 'profile' && styles.activeTab]} onPress={() => setActiveTab('profile')}>
                    <Text style={styles.tabText}>פרופיל</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.tabButton} onPress={onLogout}>
                    <Text style={[styles.tabText, { color: 'red' }]}>התנתק</Text>
                </TouchableOpacity> */}
            </View>

            {isDrawerOpen && (
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => toggleDrawer(false)} />
            )}
            
            <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: drawerAnim }] }]}>
                <Text style={styles.drawerTitle}>תפריט ניווט</Text>
                {/* <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('clock')}>
                    <Text style={styles.drawerItemText}>⏰ שעון נוכחות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('reports')}>
                    <Text style={styles.drawerItemText}>📋 היסטוריית דוחות</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('profile')}>
                    <Text style={styles.drawerItemText}>👤 פרופיל אישי</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('about')}>
                    <Text style={styles.drawerItemText}>אודות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => navigateFromDrawer('notFound')}>
                    <Text style={styles.drawerItemText}>🔍 בדיקת דף 404</Text>
                </TouchableOpacity>
                <View style={styles.drawerDivider} />
                <TouchableOpacity style={styles.drawerItem} onPress={onLogout}>
                    <Text style={[styles.drawerItemText, { color: 'red' }]}>🚪 התנתק</Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    
    header: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    hamburgerBtn: { padding: 5 },
    hamburgerText: { fontSize: 26, fontWeight: 'bold' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', marginRight: 15, flex: 1, textAlign: 'right' },
    
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

    // עיצוב הרקע והתפריט הצדי
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
    },
    drawerContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: SCREEN_WIDTH * 0.7,
        backgroundColor: '#fff',
        zIndex: 20,
        padding: 20,
        paddingTop: 50,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    drawerTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'right', marginBottom: 25, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 10 },
    drawerItem: { paddingVertical: 15 },
    drawerItemText: { fontSize: 18, textAlign: 'right', fontWeight: '500' },
    drawerDivider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
});