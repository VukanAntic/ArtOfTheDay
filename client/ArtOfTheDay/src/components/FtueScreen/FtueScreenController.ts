import {router} from 'expo-router';
import {IRepository} from '@/src/repositories/IRepository';
import {ArtworkData} from '@/src/domain/ArtworkData';
import {AllArtworksData} from '@/src/domain/AllArtworksData';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {GetRandomArtworksCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetRandomArtworksCommandHandler';
import {SetPreferredTimeCommandHandler} from '@/src/services/NextImageServices/commandHandlers/SetPreferredTimeCommandHandler';
import {FtueCompleteCommandHandler} from '@/src/services/TutorialServices/commandHandlers/FtueCompleteCommandHandler';
import {FtueScreenViewData} from '@/src/components/FtueScreen/FtueScreenViewData';

const ROUND_COUNT = 4;
const IMAGES_PER_ROUND = 4;
const DAY_MS = 24 * 60 * 60 * 1000;

export class FtueScreenController {
    private cachedRounds: FtueScreenViewData | null = null;

    constructor(
        private readonly getRandomArtworksHandler: GetRandomArtworksCommandHandler,
        private readonly setPreferredTimeHandler: SetPreferredTimeCommandHandler,
        private readonly ftueCompleteHandler: FtueCompleteCommandHandler,
        private readonly preferencesRepository: IRepository<UserPreferencesData>,
        private readonly artworkRepository: IRepository<AllArtworksData>,
        private readonly historyRepository: IRepository<SeenImageData[]>,
        private readonly refreshSession: () => Promise<void>,
    ) {}

    peekRounds(): FtueScreenViewData | null {
        return this.cachedRounds;
    }

    async loadRounds(): Promise<FtueScreenViewData> {
        if (!this.cachedRounds) {
            const artworks = await this.getRandomArtworksHandler.handle({count: ROUND_COUNT * IMAGES_PER_ROUND});
            this.cachedRounds = FtueScreenViewData.fromArtworks(artworks, ROUND_COUNT, IMAGES_PER_ROUND);
        }
        return this.cachedRounds;
    }

    async submit(
        preferredTimeInHours: number,
        preferredTimeInMinutes: number,
        selectedArtworks: ArtworkData[],
    ): Promise<void> {
        const timeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

        await this.setPreferredTimeHandler.handle({
            preferredTimeInHours,
            preferredTimeInMinutes,
            timeZoneId,
        });

        const artworkIds = selectedArtworks.map(artwork => artwork.id);
        const genreIds = [...new Set(selectedArtworks.flatMap(artwork => artwork.genres.map(genre => genre.id)))];
        const artistIds = [...new Set(selectedArtworks.map(artwork => artwork.artist.id))];

        await this.ftueCompleteHandler.handle({artworkIds, genreIds, artistIds});

        await this.refreshSession();
        await this.applyOptimisticState(selectedArtworks, artworkIds, genreIds, artistIds);

        this.cachedRounds = null;
        router.replace('/home');
    }

    private async applyOptimisticState(
        selectedArtworks: ArtworkData[],
        artworkIds: number[],
        genreIds: string[],
        artistIds: number[],
    ): Promise<void> {
        const prefs = await this.preferencesRepository.get();
        await this.preferencesRepository.update(new UserPreferencesData(
            prefs?.username ?? '',
            [...new Set([...(prefs?.likedArtworkIds ?? []), ...artworkIds])],
            [...new Set([...(prefs?.likedGenreIds ?? []), ...genreIds])],
            prefs?.dislikedArtworkIds ?? [],
            [...new Set([...(prefs?.likedArtistIds ?? []), ...artistIds])],
        ));

        const allArtworks = await this.artworkRepository.get();
        await this.artworkRepository.update((allArtworks ?? new AllArtworksData()).append(selectedArtworks));

        const history = await this.historyRepository.get() ?? [];
        const existing = new Set(history.map(seen => seen.artworkId));
        const now = Date.now();
        const additions = selectedArtworks
            .map((artwork, i) => new SeenImageData(artwork.id, new Date(now - (selectedArtworks.length - i) * DAY_MS)))
            .filter(seen => !existing.has(seen.artworkId));
        if (additions.length > 0) {
            await this.historyRepository.update([...history, ...additions]);
        }
    }
}
