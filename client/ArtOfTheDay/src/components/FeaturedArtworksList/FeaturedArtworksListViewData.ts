import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";

export default class FeaturedArtworksListViewData {
    artworkViews: FeaturedArtworkViewData[];
    onIndexChanged: (index: number) => void;

    constructor(artworkViews: FeaturedArtworkViewData[], onIndexChanged: (index: number) => void) {
        this.artworkViews = artworkViews;
        this.onIndexChanged = onIndexChanged;
    }
}