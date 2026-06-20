import {router} from 'expo-router';
import {authRepository} from '@/src/composition/AppCompositionRoot';

export function useSplashScreenController() {
    const onAnimationComplete = async () => {
        const tokens = await authRepository.get();
        router.replace(tokens ? '/home' : '/auth');
    };

    return {onAnimationComplete};
}
