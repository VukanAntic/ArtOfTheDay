export interface GetPreferencesCommand {
    token: string;
}

export interface AddLikedArtworkCommand {
    token: string;
    artworkId: number;
}

export interface RemoveLikedArtworkCommand {
    token: string;
    artworkId: number;
}

export interface AddLikedGenreCommand {
    token: string;
    genreId: string;
}

export interface RemoveLikedGenreCommand {
    token: string;
    genreId: string;
}

export interface AddLikedArtistCommand {
    token: string;
    artistId: number;
}

export interface RemoveLikedArtistCommand {
    token: string;
    artistId: number;
}

export interface AddDislikedArtworkCommand {
    token: string;
    artworkId: number;
}

export interface RemoveDislikedArtworkCommand {
    token: string;
    artworkId: number;
}
