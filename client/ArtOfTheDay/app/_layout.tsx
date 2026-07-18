import {Stack} from 'expo-router';
import {AppLoader} from '@/src/components/AppLoader/AppLoader';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{flex: 1, backgroundColor: '#000'}}>
            <AppLoader>
                <Stack screenOptions={{headerShown: false, animation: 'none'}}>
                    <Stack.Screen name="profile" options={{presentation: 'fullScreenModal', animation: 'slide_from_bottom'}}/>
                </Stack>
            </AppLoader>
        </GestureHandlerRootView>
    );
}
