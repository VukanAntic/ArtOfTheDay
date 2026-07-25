import FeaturedArtworkViewData from '@/src/components/FeaturedArtwork/FeaturedArtworkViewData';

export class HomeScreenViewData {
    constructor(
        readonly artworks: FeaturedArtworkViewData[],
        readonly loaded: boolean,
    ) {}
}
