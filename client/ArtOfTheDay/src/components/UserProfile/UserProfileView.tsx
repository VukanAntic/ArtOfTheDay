import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
    runOnUI,
    scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import {router} from 'expo-router';
import CurvedTabIndicatorView from '@/src/components/CurvedTabIndicator/CurvedTabIndicatorView';
import LikedArtScreenView from '@/src/components/LikedArtScreen/LikedArtScreenView';
import SettingsScreenView from '@/src/components/SettingsScreen/SettingsScreenView';
import UserProfileViewData from './UserProfileViewData';
import style from './UserProfileViewStyle';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type Props = {
    viewData: UserProfileViewData;
};

export default function UserProfileView({viewData}: Props) {
    const pagerRef = useAnimatedRef<Animated.ScrollView>();
    const scrollProgress = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollProgress.value = event.contentOffset.x / SCREEN_WIDTH;
        },
    });

    const handleTabPress = (index: number) => {
        runOnUI(() => {
            scrollTo(pagerRef, index * SCREEN_WIDTH, 0, true);
        })();
    };

    return (
        <View style={style.root}>
            {/* Header */}
            <View style={style.header}>
                <TouchableOpacity style={style.backButton} onPress={() => router.push('/')}>
                    <Text style={style.backIcon}>‹</Text>
                </TouchableOpacity>
                <View style={style.titleContainer}>
                    <Text style={style.title}>INSPIRA</Text>
                    <Text style={style.subtitle}>daily</Text>
                </View>
                <View style={style.headerRight}/>
            </View>

            {/* Curved tab indicator */}
            <CurvedTabIndicatorView
                scrollProgress={scrollProgress}
                onTabPress={handleTabPress}
            />

            {/* Horizontal pager */}
            <Animated.ScrollView
                ref={pagerRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                style={style.pager}
                bounces={false}
            >
                <LikedArtScreenView viewData={viewData.likedArt} width={SCREEN_WIDTH}/>
                <SettingsScreenView viewData={viewData.settings} width={SCREEN_WIDTH}/>
            </Animated.ScrollView>
        </View>
    );
}
