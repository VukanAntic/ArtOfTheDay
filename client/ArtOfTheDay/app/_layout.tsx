import { Slot } from 'expo-router';
import { AppLoader } from '@/src/components/AppLoader/AppLoader';

export default function RootLayout() {
  return (
      <AppLoader>
        <Slot />
      </AppLoader>
  );
}