import {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import DetailedArtworkPopupViewData from '@/src/components/DetailedArtworkPopup/DetailedArtworkPopupViewData';
import DetailedArtworkPopupView from '@/src/components/DetailedArtworkPopup/DetailedArtworkPopupView';
import {UserProfileController} from '@/src/components/UserProfile/UserProfileController';
import {
    preferencesRepository,
    artworkRepository,
    genresRepository,
    artistsRepository,
    historyRepository,
} from '@/src/composition/AppCompositionRoot';
import UserProfileViewData from './UserProfileViewData';
import style from './UserProfileViewStyle';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

const controller = new UserProfileController(
    preferencesRepository,
    artworkRepository,
    genresRepository,
    artistsRepository,
    historyRepository,
);

export default function UserProfileView() {
    const [viewData, setViewData] = useState<UserProfileViewData | null>(null);
    const pagerRef = useAnimatedRef<Animated.ScrollView>();
    const scrollProgress = useSharedValue(0);
    const [selectedArtwork, setSelectedArtwork] = useState<DetailedArtworkPopupViewData | null>(null);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollProgress.value = event.contentOffset.x / SCREEN_WIDTH;
        },
    });

    useEffect(() => {
        controller.loadProfile().then(setViewData);
    }, []);

    const handleTabPress = (index: number) => {
        runOnUI(() => {
            scrollTo(pagerRef, index * SCREEN_WIDTH, 0, true);
        })();
    };

    if (!viewData) return null;

    return (
        <View style={style.root}>
            {viewData.backgroundImageUrl && (
                <Image
                    source={{uri: viewData.backgroundImageUrl, headers: imageHeaders}}
                    style={[StyleSheet.absoluteFillObject, {transform: [{scale: 1.5}]}]}
                    blurRadius={80}
                    resizeMode="cover"
                />
            )}

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

            <CurvedTabIndicatorView
                scrollProgress={scrollProgress}
                onTabPress={handleTabPress}
            />

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
                <LikedArtScreenView
                    viewData={viewData.likedArt}
                    width={SCREEN_WIDTH}
                    onItemPress={setSelectedArtwork}
                />
                <SettingsScreenView viewData={viewData.settings} width={SCREEN_WIDTH}/>
            </Animated.ScrollView>

            {selectedArtwork && (
                <DetailedArtworkPopupView
                    artwork={selectedArtwork}
                    onClose={() => setSelectedArtwork(null)}
                />
            )}
        </View>
    );
}
