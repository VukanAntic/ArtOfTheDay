import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Image, StyleSheet, View} from 'react-native';
import Reanimated from 'react-native-reanimated';
import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";
import FeaturedArtworksListView from "@/src/components/FeaturedArtworksList/FeaturedArtworksListView";
import FeaturedArtworkDateListView from "@/src/components/FeaturedArtworkDateList/FeaturedArtworkDateListView";
import ArtworkDetailView from "@/src/components/ArtworkDetail/ArtworkDetailView";
import {useArtworkExpandAnimation} from "@/src/hooks/useArtworkExpandAnimation";
import style from "@/src/components/HomeScreen/HomeScreenViewStyle";
import ArtworkDetailHeader from "@/src/components/ArtworkDetail/ArtworkDetailHeader";
import {HomeScreenController} from "@/src/controllers/HomeScreenController";
import {
    getValidToken,
    getArtworksFromIdsCommandHandler,
    getHistoryCommandHandler,
    historyRepository,
    nextImageWebSocketService,
} from "@/src/composition/AppCompositionRoot";

const {width} = Dimensions.get('window');

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

const controller = new HomeScreenController(
    getHistoryCommandHandler,
    getArtworksFromIdsCommandHandler,
    getValidToken,
    historyRepository,
    nextImageWebSocketService,
);

export default function HomeScreenView() {
    console.log('[HomeScreen] render');
    const [artworks, setArtworks] = useState<FeaturedArtworkViewData[]>([]);
    const [loaded, setLoaded] = useState(false);
    const isLoading = useRef(false);

    const load = () => {
        if (isLoading.current) return;
        isLoading.current = true;
        controller.loadArtworks()
            .then(data => { setArtworks(data); setLoaded(true); })
            .catch(e => { console.error('[HomeScreen] loadArtworks failed:', e); setLoaded(true); })
            .finally(() => { isLoading.current = false; });
    };

    useEffect(() => {
        load();
        controller.connectWebSocket(load);
        return () => controller.disconnect();
    }, []);
    const [activeIndex, setActiveIndex] = useState(0);
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

    if (!loaded || artworks.length === 0) return <View style={style.container} />;

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
                />
            )}
        </View>
    );
}
