import {LoginCommandHandler} from '@/src/services/AuthServices/commandHandlers/LoginCommandHandler';
import {RegisterCommandHandler} from '@/src/services/AuthServices/commandHandlers/RegisterCommandHandler';
import {LoginCommand, RegisterCommand} from '@/src/services/AuthServices/AuthCommands';

export class AuthScreenController {
    constructor(
        private readonly loginHandler: LoginCommandHandler,
        private readonly registerHandler: RegisterCommandHandler,
    ) {}

    async login(command: LoginCommand): Promise<void> {
        await this.loginHandler.handle(command);
    }

    async register(command: RegisterCommand): Promise<void> {
        await this.registerHandler.handle(command);
    }
}
