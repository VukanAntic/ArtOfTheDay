import {router} from 'expo-router';
import {IRepository} from '@/src/repositories/IRepository';
import {AuthTokens} from '@/src/domain/Auth';
import {ViewController} from '@/src/mvc/ViewController';
import SplashScreenView from './SplashScreenView';
import {AnimationCompleteIntent, SplashScreenIntent, SplashScreenViewData} from './SplashScreenViewData';

export class SplashScreenController extends ViewController<SplashScreenViewData, SplashScreenIntent> {
    readonly View = SplashScreenView;

    constructor(
        private readonly authRepository: IRepository<AuthTokens>,
        private readonly bootstrapSession: () => Promise<void>,
    ) {
        super(new SplashScreenViewData());
    }

    onMessage(intent: SplashScreenIntent): void {
        if (intent instanceof AnimationCompleteIntent) {
            void this.enterSession();
        }
    }

    private async enterSession(): Promise<void> {
        const tokens = await this.authRepository.get();
        if (!tokens) {
            router.replace('/auth');
            return;
        }

        this.setViewData(new SplashScreenViewData(true));
        try {
            await this.bootstrapSession();
        } catch (e) {
            console.error('[Splash] session bootstrap failed:', e);
        }
        router.replace('/home');
    }
}
