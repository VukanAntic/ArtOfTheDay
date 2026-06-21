export interface GetArtworksFromIdsCommand {
    artworkIds: number[];
}

export interface GetArtworksFromGenreCommand {
    genreId: string;
}

export interface GetArtworksFromArtistCommand {
    artistId: number;
}

export interface GetAllGenresFromIdsCommand {
    genreIds: string[];
}

export interface GetAllArtistsFromIdsCommand {
    artistIds: number[];
}

export interface GetRandomArtworkIdCommand {
    excludeIds: number[];
}
