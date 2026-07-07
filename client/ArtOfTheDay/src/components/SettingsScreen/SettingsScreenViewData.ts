import {GenreData} from '@/src/domain/GenreData';
import {ArtistData} from '@/src/domain/ArtistData';

export default class SettingsScreenViewData {
    readonly likedGenres: string[];
    readonly likedArtists: string[];
    readonly allGenres: string[];
    readonly allArtists: string[];

    constructor(
        allGenres: GenreData[],
        allArtists: ArtistData[],
        likedGenreIds: string[],
        likedArtistIds: number[],
    ) {
        this.allGenres = allGenres.map(g => g.name);
        this.allArtists = allArtists.map(a => a.name);
        this.likedGenres = allGenres.filter(g => likedGenreIds.includes(g.id)).map(g => g.name);
        this.likedArtists = allArtists.filter(a => likedArtistIds.includes(a.id)).map(a => a.name);
    }
}
