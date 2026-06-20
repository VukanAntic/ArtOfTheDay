import {useEffect} from 'react';
import {Slot, router} from 'expo-router';
import {AppLoader} from '@/src/components/AppLoader/AppLoader';
import SafeArea from "@/src/components/SafeArea/SafeArea";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import {authRepository} from '@/src/composition/AppCompositionRoot';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        authRepository.get().then(tokens => {
            if (!tokens) router.replace('/auth');
        });
    }, []);

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