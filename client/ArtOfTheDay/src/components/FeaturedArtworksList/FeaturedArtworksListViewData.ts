import {Animated} from 'react-native';
import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";
import {ArtworkPreferenceIntent} from "@/src/services/PreferenceServices/ArtworkPreferenceIntent";

export default class FeaturedArtworksListViewData {
    artworkViews: FeaturedArtworkViewData[];
    onIndexChanged: (index: number) => void;
    scrollX: Animated.Value;
    onSeeMore: (artwork: FeaturedArtworkViewData) => void;
    onPreferenceIntent: (intent: ArtworkPreferenceIntent) => void;

    constructor(
        artworkViews: FeaturedArtworkViewData[],
        onIndexChanged: (index: number) => void,
        scrollX: Animated.Value,
        onSeeMore: (artwork: FeaturedArtworkViewData) => void,
        onPreferenceIntent: (intent: ArtworkPreferenceIntent) => void,
    ) {
        this.artworkViews = artworkViews;
        this.onIndexChanged = onIndexChanged;
        this.scrollX = scrollX;
        this.onSeeMore = onSeeMore;
        this.onPreferenceIntent = onPreferenceIntent;
    }
}