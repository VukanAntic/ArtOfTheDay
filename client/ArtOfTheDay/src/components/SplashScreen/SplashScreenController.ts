import {router} from 'expo-router';
import {IRepository} from '@/src/repositories/IRepository';
import {AuthTokens} from '@/src/domain/Auth';
import {ViewController} from '@/src/mvc/ViewController';
import SplashScreenView from './SplashScreenView';
import {AnimationCompleteIntent, SplashScreenIntent, SplashScreenViewData} from './SplashScreenViewData';

export class SplashScreenController extends ViewController<SplashScreenViewData, SplashScreenIntent> {
    readonly View = SplashScreenView;

    constructor(private readonly authRepository: IRepository<AuthTokens>) {
        super(new SplashScreenViewData());
    }

    onMessage(intent: SplashScreenIntent): void {
        if (intent instanceof AnimationCompleteIntent) {
            void this.navigateOnwards();
        }
    }

    private async navigateOnwards(): Promise<void> {
        const tokens = await this.authRepository.get();
        router.replace(tokens ? '/home' : '/auth');
    }
}
