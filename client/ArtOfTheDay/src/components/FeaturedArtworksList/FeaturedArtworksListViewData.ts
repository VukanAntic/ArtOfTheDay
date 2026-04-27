import {Animated} from 'react-native';
import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";

export default class FeaturedArtworksListViewData {
    artworkViews: FeaturedArtworkViewData[];
    onIndexChanged: (index: number) => void;
    scrollX: Animated.Value;
    onSeeMore: (artwork: FeaturedArtworkViewData) => void;

    constructor(
        artworkViews: FeaturedArtworkViewData[],
        onIndexChanged: (index: number) => void,
        scrollX: Animated.Value,
        onSeeMore: (artwork: FeaturedArtworkViewData) => void,
    ) {
        this.artworkViews = artworkViews;
        this.onIndexChanged = onIndexChanged;
        this.scrollX = scrollX;
        this.onSeeMore = onSeeMore;
    }
}