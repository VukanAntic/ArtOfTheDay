import {router} from 'expo-router';
import {ViewController} from '@/src/mvc/ViewController';
import {LoginCommandHandler} from '@/src/services/AuthServices/commandHandlers/LoginCommandHandler';
import {RegisterCommandHandler} from '@/src/services/AuthServices/commandHandlers/RegisterCommandHandler';
import {FtueScreenController} from '@/src/components/FtueScreen/FtueScreenController';
import AuthScreenView from './AuthScreenView';
import AuthScreenViewData, {AuthScreenIntent, LoginIntent, RegisterIntent} from './AuthScreenViewData';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class AuthScreenController extends ViewController<AuthScreenViewData, AuthScreenIntent> {
    readonly View = AuthScreenView;

    constructor(
        private readonly loginHandler: LoginCommandHandler,
        private readonly registerHandler: RegisterCommandHandler,
        private readonly ftueController: FtueScreenController,
        private readonly refreshSession: () => Promise<void>,
    ) {
        super(new AuthScreenViewData(false, null));
    }

    onMount(): void {
        this.setViewData(new AuthScreenViewData(false, null));
    }

    onMessage(intent: AuthScreenIntent): void {
        if (intent instanceof LoginIntent) {
            void this.login(intent);
        } else if (intent instanceof RegisterIntent) {
            void this.register(intent);
        }
    }

    private async login(intent: LoginIntent): Promise<void> {
        const username = intent.username.trim();
        if (!username || !intent.password) {
            this.setViewData(new AuthScreenViewData(false, 'Please enter your username and password.'));
            return;
        }
        this.setViewData(new AuthScreenViewData(true, null));
        try {
            await this.loginHandler.handle({username, password: intent.password});
            await this.refreshSession();
            router.replace('/home');
        } catch (e) {
            this.setViewData(new AuthScreenViewData(false, e instanceof Error ? e.message : 'Login failed'));
        }
    }

    private async register(intent: RegisterIntent): Promise<void> {
        const firstName = intent.firstName.trim();
        const lastName = intent.lastName.trim();
        const username = intent.username.trim();
        const email = intent.email.trim();
        const {password, confirmPassword} = intent;

        if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
            this.setViewData(new AuthScreenViewData(false, 'Please fill in all fields.'));
            return;
        }
        if (username.length < 6 || username.length > 20) {
            this.setViewData(new AuthScreenViewData(false, 'Username must be between 6 and 20 characters.'));
            return;
        }
        if (!EMAIL_PATTERN.test(email)) {
            this.setViewData(new AuthScreenViewData(false, 'Please enter a valid email address.'));
            return;
        }
        if (password.length < 6 || password.length > 20) {
            this.setViewData(new AuthScreenViewData(false, 'Password must be between 6 and 20 characters.'));
            return;
        }
        if (password !== confirmPassword) {
            this.setViewData(new AuthScreenViewData(false, 'Passwords do not match.'));
            return;
        }
        this.setViewData(new AuthScreenViewData(true, null));
        try {
            await this.registerHandler.handle({firstName, lastName, username, email, password, confirmPassword});
            await this.ftueController.loadRounds().catch(() => {});
            router.replace('/ftue');
        } catch (e) {
            this.setViewData(new AuthScreenViewData(false, e instanceof Error ? e.message : 'Registration failed'));
        }
    }
}
