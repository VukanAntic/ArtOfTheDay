export default class SettingsScreenViewData {
    likedGenres: string[];
    likedArtists: string[];
    allGenres: string[];
    allArtists: string[];

    constructor(
        likedGenres: string[],
        likedArtists: string[],
        allGenres: string[],
        allArtists: string[],
    ) {
        this.likedGenres = likedGenres;
        this.likedArtists = likedArtists;
        this.allGenres = allGenres;
        this.allArtists = allArtists;
    }
}
