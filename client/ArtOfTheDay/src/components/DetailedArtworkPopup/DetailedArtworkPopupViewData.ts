import {ArtworkData} from '@/src/domain/ArtworkData';
import {stripHtml} from '@/src/utils/stripHtml';

export default class DetailedArtworkPopupViewData {
    readonly id: string;
    readonly title: string;
    readonly imageURL: string;
    readonly receivedAt: Date;
    readonly description: string;
    readonly artistName: string;
    readonly isImageLiked: boolean;

    constructor(artwork: ArtworkData, receivedAt: Date | null) {
        this.id = String(artwork.id);
        this.title = artwork.title;
        this.imageURL = artwork.imageUrl;
        this.receivedAt = receivedAt ?? new Date(0);
        this.description = stripHtml(artwork.description);
        this.artistName = artwork.artist.name;
        this.isImageLiked = true;
    }
}
