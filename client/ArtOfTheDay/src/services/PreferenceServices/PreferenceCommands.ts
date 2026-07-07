export interface GetPreferencesCommand {}

export interface AddLikedArtworkCommand {
    artworkId: number;
}

export interface RemoveLikedArtworkCommand {
    artworkId: number;
}

export interface AddLikedGenreCommand {
    genreId: string;
}

export interface RemoveLikedGenreCommand {
    genreId: string;
}

export interface AddLikedArtistCommand {
    artistId: number;
}

export interface RemoveLikedArtistCommand {
    artistId: number;
}

export interface AddDislikedArtworkCommand {
    artworkId: number;
}

export interface RemoveDislikedArtworkCommand {
    artworkId: number;
}
