import AuthScreenView from '@/src/components/AuthScreen/AuthScreenView';
import SafeArea from '@/src/components/SafeArea/SafeArea';

export default function AuthRoute() {
    return (
        <SafeArea>
            <AuthScreenView />
        </SafeArea>
    );
}
