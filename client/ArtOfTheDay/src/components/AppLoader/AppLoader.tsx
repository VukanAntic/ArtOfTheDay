import {ReactNode, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {customFonts} from '../../config/fonts';

type Props = {
    children: ReactNode;
};

export function AppLoader({children}: Props) {
    const [fontsLoaded] = useFonts(customFonts);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.root} onLayout={onLayoutRootView}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {flex: 1},
});