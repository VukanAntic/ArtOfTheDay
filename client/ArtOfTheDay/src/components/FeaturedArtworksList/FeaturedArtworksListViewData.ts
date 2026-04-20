import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";

export default class FeaturedArtworksListViewData {
    artworkViews: FeaturedArtworkViewData[];

    constructor(artworkViews: FeaturedArtworkViewData[]) {
        this.artworkViews = artworkViews;

    }
}