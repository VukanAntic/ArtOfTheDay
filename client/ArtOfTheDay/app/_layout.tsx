import { Slot } from 'expo-router';
import { AppLoader } from '@/src/components/AppLoader/AppLoader';
import SafeArea from "@/src/components/SafeArea/SafeArea";

export default function RootLayout() {
    return (
        <SafeArea>
            <AppLoader>
                <Slot/>
            </AppLoader>
        </SafeArea>
    );
}