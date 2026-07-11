export type ArtworkPreferenceIntent =
    | {type: 'LIKE'; artworkId: number}
    | {type: 'UNLIKE'; artworkId: number}
    | {type: 'DISLIKE'; artworkId: number}
    | {type: 'UNDISLIKE'; artworkId: number};
