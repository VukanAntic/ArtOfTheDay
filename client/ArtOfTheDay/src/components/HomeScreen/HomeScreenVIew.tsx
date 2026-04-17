// src/screens/HomeScreen.tsx

import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '@/src/config/fonts';

export function HomeScreenView() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Mathrs</Text>
            <Text style={styles.body}>Pick a topic to get started.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    heading:   { fontFamily: fonts.YesevaOne_Regular, fontSize: 32 },
    body:      { fontFamily: fonts.Lato_Regular, fontSize: 16, marginTop: 8 },
});