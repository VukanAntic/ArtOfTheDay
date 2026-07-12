import {ArtworkData} from '@/src/domain/ArtworkData';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {stripHtml} from '@/src/utils/stripHtml';

export default class FeaturedArtworkViewData {
    readonly id: string;
    readonly title: string;
    readonly imageURL: string;
    readonly receivedAt: Date;
    readonly description: string;
    readonly artistName: string;
    readonly isLiked: boolean;

    constructor(artwork: ArtworkData, seenImage: SeenImageData, isLiked: boolean) {
        this.id = String(artwork.id);
        this.title = artwork.title;
        this.imageURL = artwork.imageUrl;
        this.receivedAt = seenImage.seenAt;
        this.description = stripHtml(artwork.description);
        this.artistName = artwork.artist.name;
        this.isLiked = isLiked;
    }
}
