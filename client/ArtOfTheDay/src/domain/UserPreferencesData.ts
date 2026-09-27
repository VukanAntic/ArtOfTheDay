export class UserPreferencesData {
    constructor(
        readonly username: string,
        readonly likedArtworkIds: number[],
        readonly likedGenreIds: string[],
        readonly dislikedArtworkIds: number[],
        readonly likedArtistIds: number[],
        readonly profileArtworkId: number | null = null,
    ) {}

    isArtworkLiked(id: number): boolean { return this.likedArtworkIds.includes(id); }
    isArtworkDisliked(id: number): boolean { return this.dislikedArtworkIds.includes(id); }
    isGenreLiked(id: string): boolean { return this.likedGenreIds.includes(id); }
    isArtistLiked(id: number): boolean { return this.likedArtistIds.includes(id); }
    isProfileArtwork(id: number): boolean { return this.profileArtworkId === id; }
}
