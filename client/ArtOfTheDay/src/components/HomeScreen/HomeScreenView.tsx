import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Image, StyleSheet, View} from 'react-native';
import Reanimated from 'react-native-reanimated';
import {ViewProps} from '@/src/mvc/ViewController';
import FeaturedArtworkViewData from '@/src/components/FeaturedArtwork/FeaturedArtworkViewData';
import FeaturedArtworksListView from '@/src/components/FeaturedArtworksList/FeaturedArtworksListView';
import FeaturedArtworkDateListView from '@/src/components/FeaturedArtworkDateList/FeaturedArtworkDateListView';
import ArtworkDetailView from '@/src/components/ArtworkDetail/ArtworkDetailView';
import {useArtworkExpandAnimation} from '@/src/hooks/useArtworkExpandAnimation';
import style from '@/src/components/HomeScreen/HomeScreenViewStyle';
import ArtworkDetailHeader from '@/src/components/ArtworkDetail/ArtworkDetailHeader';
import {ArtworkPreferenceIntent} from '@/src/services/PreferenceServices/ArtworkPreferenceIntent';
import {HomeScreenViewData} from './HomeScreenViewData';

const {width} = Dimensions.get('window');

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

export default function HomeScreenView({viewData, send}: ViewProps<HomeScreenViewData, ArtworkPreferenceIntent>) {
    const artworks = viewData.artworks;

    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        if (artworks.length > 0) setActiveIndex(artworks.length - 1);
    }, [artworks.length]);

    const [selectedArtwork, setSelectedArtwork] = useState<FeaturedArtworkViewData | null>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const {cardStyle, homeUIOpacity, detailUIOpacity, infoPanelStyle, open, close} = useArtworkExpandAnimation();

    const handleSeeMore = useCallback((artwork: FeaturedArtworkViewData) => {
        setSelectedArtwork(artwork);
        open();
    }, [open]);

    const handleClose = useCallback(() => {
        close(() => setSelectedArtwork(null));
    }, [close]);

    const onPreferenceIntent = useCallback(
        (intent: ArtworkPreferenceIntent) => send(intent),
        [send],
    );

    if (!viewData.loaded || artworks.length === 0) return <View style={style.container} />;

    return (
        <View style={style.container}>
            <Image
                source={{uri: artworks[activeIndex].imageURL, headers: imageHeaders}}
                style={[StyleSheet.absoluteFillObject, {transform: [{scale: 1.5}]}]}
                blurRadius={80}
                resizeMode="cover"
            />

            <Reanimated.View style={[style.headerContainer, homeUIOpacity]}>
                <ArtworkDetailHeader backgroundImageUrl={artworks[activeIndex].imageURL}/>
            </Reanimated.View>

            <Reanimated.View style={[{flex: 1}, homeUIOpacity]}>
                <FeaturedArtworksListView
                    artworkViews={artworks}
                    onIndexChanged={setActiveIndex}
                    scrollX={scrollX}
                    onSeeMore={handleSeeMore}
                    onPreferenceIntent={onPreferenceIntent}
                />
            </Reanimated.View>

            <Reanimated.View style={[style.dateListContainer, homeUIOpacity]}>
                <FeaturedArtworkDateListView
                    dates={artworks.map(item => item.receivedAt)}
                    scrollX={scrollX}
                    pageWidth={width}
                    activeIndex={activeIndex}
                />
            </Reanimated.View>

            {selectedArtwork && (
                <ArtworkDetailView
                    artwork={selectedArtwork}
                    cardStyle={cardStyle}
                    detailUIOpacity={detailUIOpacity}
                    infoPanelStyle={infoPanelStyle}
                    onClose={handleClose}
                    onPreferenceIntent={onPreferenceIntent}
                />
            )}
        </View>
    );
}
