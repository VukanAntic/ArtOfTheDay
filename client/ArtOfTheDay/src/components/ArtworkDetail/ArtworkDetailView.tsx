import {useState} from 'react';
import Animated, {runOnJS, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated';
import {Dimensions, StyleSheet, View} from 'react-native';
import FeaturedArtworkViewData from '@/src/components/FeaturedArtwork/FeaturedArtworkViewData';
import {ArtworkPreferenceIntent} from '@/src/services/PreferenceServices/ArtworkPreferenceIntent';
import ArtworkDetailHeader from './ArtworkDetailHeader';
import ArtworkDetailInfoPanel from './ArtworkDetailInfoPanel';
import {shareArtwork} from '@/src/utils/shareArtwork';

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
    onPreferenceIntent: (intent: ArtworkPreferenceIntent) => void;
};

export default function ArtworkDetailView({artwork, cardStyle, detailUIOpacity, infoPanelStyle, onClose, onPreferenceIntent}: Props) {
    const isClosing = useSharedValue(false);
    const [liked, setLiked] = useState(artwork.isLiked);

    const onToggleLike = () => {
        const next = !liked;
        setLiked(next);
        onPreferenceIntent({type: next ? 'LIKE' : 'UNLIKE', artworkId: Number(artwork.id)});
    };

    const handleShare = () => shareArtwork({title: artwork.title, artistName: artwork.artistName, imageURL: artwork.imageURL});

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

            <Animated.ScrollView
                style={[StyleSheet.absoluteFillObject, infoPanelStyle]}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={true}
                contentContainerStyle={{paddingBottom: 48}}
            >
                <View style={{height: SPACER_HEIGHT}}/>
                <ArtworkDetailInfoPanel artwork={artwork} isLiked={liked} onToggleLike={onToggleLike} onClose={onClose} onShare={handleShare}/>
            </Animated.ScrollView>

            <View
                style={StyleSheet.absoluteFillObject}
                pointerEvents="box-none"
            >
                <ArtworkDetailHeader onClose={onClose} backButtonOpacity={detailUIOpacity}/>
            </View>
        </View>
    );
}
