import {ArtworkData} from '@/src/domain/ArtworkData';

export class FtueScreenViewData {
    constructor(readonly rounds: ArtworkData[][]) {}

    static fromArtworks(artworks: ArtworkData[], roundCount: number, perRound: number): FtueScreenViewData {
        const pool = [...artworks];
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }

        const rounds: ArtworkData[][] = [];
        for (let r = 0; r < roundCount; r++) {
            const slice = pool.slice(r * perRound, r * perRound + perRound);
            if (slice.length === 0) break;
            rounds.push(slice);
        }
        return new FtueScreenViewData(rounds);
    }
}
