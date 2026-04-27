import Animated, {runOnJS, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import {Dimensions, StyleSheet, View} from 'react-native';
import FeaturedArtworkViewData from '@/src/components/FeaturedArtwork/FeaturedArtworkViewData';
import ArtworkDetailHeader from './ArtworkDetailHeader';
import ArtworkDetailInfoPanel from './ArtworkDetailInfoPanel';

const {height: SCREEN_H} = Dimensions.get('window');

// Transparent spacer above the panel content. Determines how much artwork
// is visible above the action bar in the initial (collapsed) state.
const SPACER_HEIGHT = SCREEN_H * 0.55;

// How far the user must pull down past the top before close triggers.
const CLOSE_THRESHOLD = -80;

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type Props = {
    artwork: FeaturedArtworkViewData;
    cardStyle: any;
    detailUIOpacity: any;
    infoPanelStyle: any;
    onClose: () => void;
};

export default function ArtworkDetailView({artwork, cardStyle, detailUIOpacity, infoPanelStyle, onClose}: Props) {
    const isClosing = useSharedValue(false);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            if (event.contentOffset.y < CLOSE_THRESHOLD && !isClosing.value) {
                isClosing.value = true;
                runOnJS(onClose)();
            }
        },
    });

    return (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
            {/* Expanding artwork image */}
            <Animated.Image
                source={{uri: artwork.imageURL, headers: imageHeaders}}
                style={cardStyle}
                resizeMode="cover"
            />

            {/* Full-screen scroll view — transparent so artwork shows through the spacer.
                Captures all scroll gestures everywhere on the screen. */}
            <Animated.ScrollView
                style={[StyleSheet.absoluteFillObject, infoPanelStyle]}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={true}
                contentContainerStyle={{paddingBottom: 48}}
            >
                <View style={{height: SPACER_HEIGHT}}/>
                <ArtworkDetailInfoPanel artwork={artwork}/>
            </Animated.ScrollView>

            {/* Header — rendered on top but passes scroll gestures through via box-none */}
            <Animated.View
                style={[StyleSheet.absoluteFillObject, detailUIOpacity]}
                pointerEvents="box-none"
            >
                <ArtworkDetailHeader onClose={onClose}/>
            </Animated.View>
        </View>
    );
}
