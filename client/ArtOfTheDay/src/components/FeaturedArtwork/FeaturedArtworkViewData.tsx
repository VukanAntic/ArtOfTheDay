import {ArtworkData} from '@/src/domain/ArtworkData';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {stripHtml} from '@/src/utils/stripHtml';

export default class FeaturedArtworkViewData {
    readonly id: string;
    readonly title: string;
    readonly year: string;
    readonly imageURL: string;
    readonly receivedAt: Date;
    readonly description: string;
    readonly artistName: string;

    constructor(artwork: ArtworkData, seenImage: SeenImageData) {
        this.id = String(artwork.id);
        this.title = artwork.title;
        this.year = '';
        this.imageURL = artwork.imageUrl;
        this.receivedAt = seenImage.seenAt;
        this.description = stripHtml(artwork.description);
        this.artistName = artwork.artist.name;
    }
}
