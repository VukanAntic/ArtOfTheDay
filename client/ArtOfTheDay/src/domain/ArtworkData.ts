import {ArtistData} from './ArtistData';
import {GenreData} from './GenreData';

export class ArtworkData {
    constructor(
        readonly id: number,
        readonly title: string,
        readonly description: string,
        readonly imageUrl: string,
        readonly artist: ArtistData,
        readonly genres: GenreData[],
    ) {}
}
