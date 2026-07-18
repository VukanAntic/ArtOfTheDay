import HomeScreenView from '@/src/components/HomeScreen/HomeScreenView';
import SafeArea from '@/src/components/SafeArea/SafeArea';

export default function HomeRoute() {
    return (
        <SafeArea>
            <HomeScreenView />
        </SafeArea>
    );
}
