import {ArtworkData} from '@/src/domain/ArtworkData';

export class FtueImageChoiceViewData {
    constructor(
        readonly id: number,
        readonly title: string,
        readonly artistName: string,
        readonly imageUrl: string,
    ) {}

    static fromArtwork(artwork: ArtworkData): FtueImageChoiceViewData {
        return new FtueImageChoiceViewData(artwork.id, artwork.title, artwork.artist.name, artwork.imageUrl);
    }
}
