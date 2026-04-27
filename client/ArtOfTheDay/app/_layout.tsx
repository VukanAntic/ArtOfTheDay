import { Slot } from 'expo-router';
import { AppLoader } from '@/src/components/AppLoader/AppLoader';
import SafeArea from "@/src/components/SafeArea/SafeArea";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeArea>
                <AppLoader>
                    <Slot/>
                </AppLoader>
            </SafeArea>
        </GestureHandlerRootView>
    );
}