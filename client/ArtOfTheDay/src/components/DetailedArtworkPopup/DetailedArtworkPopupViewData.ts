import {ArtworkData} from '@/src/domain/ArtworkData';
import {stripHtml} from '@/src/utils/stripHtml';

export default class DetailedArtworkPopupViewData {
    readonly id: string;
    readonly title: string;
    readonly year: string;
    readonly imageURL: string;
    readonly receivedAt: Date;
    readonly paintingDescription: string;
    readonly artistName: string;
    readonly artistLifespan: string;
    readonly artistDescription: string;

    constructor(artwork: ArtworkData, receivedAt: Date | null) {
        this.id = String(artwork.id);
        this.title = artwork.title;
        this.year = '';
        this.imageURL = artwork.imageUrl;
        this.receivedAt = receivedAt ?? new Date(0);
        this.paintingDescription = stripHtml(artwork.description);
        this.artistName = artwork.artist.name;
        this.artistLifespan = '';
        this.artistDescription = '';
    }
}
