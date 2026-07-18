import UserProfileView from '@/src/components/UserProfile/UserProfileView';
import SafeArea from '@/src/components/SafeArea/SafeArea';

export default function ProfileRoute() {
    return (
        <SafeArea>
            <UserProfileView />
        </SafeArea>
    );
}
