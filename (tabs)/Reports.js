import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function ReportsPage() {
    const [history, setHistory] = useState([]);
    const [selectedShift, setSelectedShift] = useState(null);

    // טעינת ההיסטוריה בכל פעם שהמסך עולה
    useEffect(() => {
        // AsyncStorage.clear();
        async function loadHistory() {
            try {
                const savedHistory = await AsyncStorage.getItem('shift_history');
                if (savedHistory !== null) {
                    setHistory(JSON.parse(savedHistory));
                }
            } catch (error) {
                console.log("Error loading history", error);
            }
        }
        loadHistory();
    }, []);

    const renderShiftItem = ({ item }) => (
        <TouchableOpacity style={styles.shiftCard} onPress={() => setSelectedShift(item)}>
            <View style={styles.shiftCardRow}>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={styles.cardDuration}>{item.duration}</Text>
            </View>
            <Text style={styles.cardSubText}>שעות: {item.entry} - {item.exit}</Text>
        </TouchableOpacity>
    );

    // תצוגת מסך פרטי החתמה מורחב
    if (selectedShift) {
        return (
            <View style={styles.detailsScreen}>
                <Text style={styles.detailsTitle}>פרטי משמרת מורחבים</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>תאריך משמרת:</Text><Text style={styles.detailValue}>{selectedShift.date}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>שעת כניסה:</Text><Text style={styles.detailValue}>{selectedShift.entry}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>שעת יציאה:</Text><Text style={styles.detailValue}>{selectedShift.exit}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>סך הכל שעות:</Text><Text style={styles.detailValue}>{selectedShift.duration}</Text></View>
                </View>
                <TouchableOpacity style={styles.backButton} onPress={() => setSelectedShift(null)}>
                    <Text style={styles.backButtonText}>חזור לרשימה</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // תצוגת הרשימה הראשית (או מסך ריק)
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.screenTitle}>היסטוריית משמרות</Text>
            {history.length === 0 ? (
                <View style={styles.centerScreen}>
                    <LottieView 
                        source={require('../assets/NO RESULTS.json')} 
                        autoPlay 
                        loop 
                        style={styles.lottieAnim}
                    />
                    <Text style={styles.emptyText}>אין עדיין משמרות שמורות במערכת</Text>
                </View>
            ) : (
                <FlatList 
                    data={history}
                    keyExtractor={(item) => item.id}
                    renderItem={renderShiftItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: 20 },
    centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    screenTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', marginBottom: 15, color: '#333' },
    shiftCard: {
        backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10,
        elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41,
    },
    shiftCardRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 5 },
    cardDate: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    cardDuration: { fontSize: 14, fontWeight: '600', color: '#4CAF50' },
    cardSubText: { fontSize: 14, color: '#666', textAlign: 'right' },
    lottieAnim: { width: 200, height: 200 },
    emptyText: { fontSize: 16, color: '#888', marginTop: 10, fontWeight: '500' },
    detailsScreen: { flex: 1, padding: 30, alignItems: 'center', justifyContent: 'center' },
    detailsTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#222' },
    detailsContainer: { backgroundColor: '#fff', width: '100%', padding: 20, borderRadius: 15, elevation: 3, marginBottom: 30 },
    detailRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    detailLabel: { fontSize: 16, fontWeight: 'bold', color: '#555' },
    detailValue: { fontSize: 16, color: '#333' },
    backButton: { backgroundColor: '#333', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 25 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});