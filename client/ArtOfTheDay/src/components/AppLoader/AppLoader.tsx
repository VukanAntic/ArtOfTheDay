import {ReactNode, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {customFonts} from '../../config/fonts';

type Props = {
    children: ReactNode;
};

export function AppLoader({children}: Props) {
    const [fontsLoaded] = useFonts(customFonts);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return <View style={[styles.root, styles.loading]}/>;
    }

    return (
        <View style={styles.root}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {flex: 1},
    loading: {backgroundColor: '#000'},
});