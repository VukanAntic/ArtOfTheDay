import {ArtworkData} from '@/src/domain/ArtworkData';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {LikedArtworkCellViewData} from '@/src/components/LikedArtworkCell/LikedArtworkCellViewData';

export default class LikedArtScreenViewData {
    readonly items: LikedArtworkCellViewData[];

    constructor(artworks: ArtworkData[], history: SeenImageData[]) {
        this.items = artworks
            .map(artwork => {
                const seenImage = history.find(s => s.artworkId === artwork.id);
                return {artwork, seenAt: seenImage?.seenAt ?? null};
            })
            .sort((a, b) => (b.seenAt?.getTime() ?? 0) - (a.seenAt?.getTime() ?? 0))
            .map(({artwork, seenAt}) => new LikedArtworkCellViewData(artwork, seenAt));
    }
}
