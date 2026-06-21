import {FtueCompleteCommand} from './TutorialCommands';

export interface ITutorialClient {
    ftueComplete(command: FtueCompleteCommand): Promise<void>;
}
