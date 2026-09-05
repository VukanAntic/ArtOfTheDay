import {router} from 'expo-router';
import {IRepository} from '@/src/repositories/IRepository';
import {ArtworkData} from '@/src/domain/ArtworkData';
import {AllArtworksData} from '@/src/domain/AllArtworksData';
import {SeenImageData} from '@/src/domain/SeenImageData';
import {UserPreferencesData} from '@/src/domain/UserPreferencesData';
import {ViewController} from '@/src/mvc/ViewController';
import {GetRandomArtworksCommandHandler} from '@/src/services/ImageServices/commandHandlers/GetRandomArtworksCommandHandler';
import {SetPreferredTimeCommandHandler} from '@/src/services/NextImageServices/commandHandlers/SetPreferredTimeCommandHandler';
import {FtueCompleteCommandHandler} from '@/src/services/TutorialServices/commandHandlers/FtueCompleteCommandHandler';
import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';
import {FtueImageChoiceViewData} from '@/src/components/FtueImageChoice/FtueImageChoiceViewData';
import FtueScreenView from './FtueScreenView';
import {
    ContinueIntent,
    ExactTimeToggledIntent,
    FtueScreenIntent,
    FtueScreenViewData,
    TileSelectedIntent,
    TimeChangedIntent,
} from './FtueScreenViewData';

const ROUND_COUNT = 4;
const IMAGES_PER_ROUND = 4;
const DAY_MS = 24 * 60 * 60 * 1000;

export class FtueScreenController extends ViewController<FtueScreenViewData, FtueScreenIntent> {
    readonly View = FtueScreenView;

    private rounds: ArtworkData[][] = [];
    private selected: (ArtworkData | null)[] = [];
    private page = 0;
    private time = new FtueTimePickerViewData(8, 0, 'AM');
    private exactTime = false;
    private submitting = false;
    private loaded = false;

    constructor(
        private readonly getRandomArtworksHandler: GetRandomArtworksCommandHandler,
        private readonly setPreferredTimeHandler: SetPreferredTimeCommandHandler,
        private readonly ftueCompleteHandler: FtueCompleteCommandHandler,
        private readonly preferencesRepository: IRepository<UserPreferencesData>,
        private readonly artworkRepository: IRepository<AllArtworksData>,
        private readonly historyRepository: IRepository<SeenImageData[]>,
        private readonly refreshSession: () => Promise<void>,
    ) {
        super(FtueScreenViewData.loading());
    }

    async loadRounds(): Promise<void> {
        if (this.loaded) return;
        const artworks = await this.getRandomArtworksHandler.handle({count: ROUND_COUNT * IMAGES_PER_ROUND});
        this.rounds = this.buildRounds(artworks);
        this.selected = new Array(this.rounds.length).fill(null);
        this.loaded = true;
    }

    onMount(): void {
        void this.initialize();
    }

    private async initialize(): Promise<void> {
        this.page = 0;
        this.submitting = false;
        this.time = new FtueTimePickerViewData(8, 0, 'AM');
        this.exactTime = false;
        if (!this.loaded) {
            try {
                await this.loadRounds();
            } catch (e) {
                console.error('[Ftue] loadRounds failed:', e);
                return;
            }
        }
        this.selected = new Array(this.rounds.length).fill(null);
        this.rebuild();
    }

    onMessage(intent: FtueScreenIntent): void {
        if (intent instanceof TimeChangedIntent) {
            this.time = intent.time;
            this.rebuild();
        } else if (intent instanceof ExactTimeToggledIntent) {
            this.exactTime = intent.exact;
            this.rebuild();
        } else if (intent instanceof TileSelectedIntent) {
            this.selectTile(intent.artworkId);
        } else if (intent instanceof ContinueIntent) {
            this.advance();
        }
    }

    private selectTile(artworkId: number): void {
        if (this.page === 0) return;
        const roundIndex = this.page - 1;
        this.selected[roundIndex] = this.rounds[roundIndex].find(a => a.id === artworkId) ?? null;
        this.rebuild();
    }

    private advance(): void {
        if (this.submitting) return;
        const isTimePage = this.page === 0;
        const roundIndex = this.page - 1;
        const canContinue = isTimePage || this.selected[roundIndex] != null;
        if (!canContinue) return;

        const isLastPage = !isTimePage && roundIndex === this.rounds.length - 1;
        if (!isLastPage) {
            this.page += 1;
            this.rebuild();
            return;
        }
        void this.submit();
    }

    private async submit(): Promise<void> {
        this.submitting = true;
        this.rebuild();

        const picks = this.selected.filter((a): a is ArtworkData => a !== null);
        const {hours24, minutes} = this.time.to24Hour();
        const timeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

        try {
            await this.setPreferredTimeHandler.handle({
                preferredTimeInHours: hours24,
                preferredTimeInMinutes: minutes,
                timeZoneId,
            });

            const artworkIds = picks.map(a => a.id);
            const genreIds = [...new Set(picks.flatMap(a => a.genres.map(g => g.id)))];
            const artistIds = [...new Set(picks.map(a => a.artist.id))];

            await this.ftueCompleteHandler.handle({artworkIds, genreIds, artistIds});
            await this.refreshSession();
            await this.applyOptimisticState(picks, artworkIds, genreIds, artistIds);

            this.loaded = false;
            this.rounds = [];
            router.replace('/home');
        } catch (e) {
            console.error('[Ftue] submit failed:', e);
            this.submitting = false;
            this.rebuild();
        }
    }

    private rebuild(): void {
        if (!this.loaded) {
            this.setViewData(FtueScreenViewData.loading());
            return;
        }
        const totalRounds = this.rounds.length;
        const isTimePage = this.page === 0;
        const roundIndex = this.page - 1;
        const currentRound = isTimePage ? [] : this.rounds[roundIndex];
        const tiles = currentRound.map(FtueImageChoiceViewData.fromArtwork);
        const selectedId = isTimePage ? null : this.selected[roundIndex]?.id ?? null;
        const canContinue = isTimePage || selectedId !== null;
        const isLastPage = !isTimePage && roundIndex === totalRounds - 1;

        this.setViewData(new FtueScreenViewData(
            false,
            totalRounds + 1,
            this.page,
            isTimePage,
            this.time,
            this.exactTime,
            roundIndex + 1,
            totalRounds,
            tiles,
            selectedId,
            canContinue,
            isLastPage,
            this.submitting,
        ));
    }

    private buildRounds(artworks: ArtworkData[]): ArtworkData[][] {
        const pool = [...artworks];
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        const rounds: ArtworkData[][] = [];
        for (let r = 0; r < ROUND_COUNT; r++) {
            const slice = pool.slice(r * IMAGES_PER_ROUND, r * IMAGES_PER_ROUND + IMAGES_PER_ROUND);
            if (slice.length === 0) break;
            rounds.push(slice);
        }
        return rounds;
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
