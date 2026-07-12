import {ArtworkData} from '@/src/domain/ArtworkData';

export class AllArtworksData {
    constructor(readonly artworks: ArtworkData[] = []) {}

    getById(id: number): ArtworkData | undefined {
        return this.artworks.find(a => a.id === id);
    }

    append(newArtworks: ArtworkData[]): AllArtworksData {
        const byId = new Map(this.artworks.map(a => [a.id, a]));
        newArtworks.forEach(a => byId.set(a.id, a));
        return new AllArtworksData([...byId.values()]);
    }
}
