import {SeenImageData} from '@/src/domain/SeenImageData';
import {SetPreferredTimeCommand} from '@/src/services/NextImageServices/NextImageCommands';

export interface INextImageClient {
    getHistory(): Promise<SeenImageData[]>;
    setPreferredTime(command: SetPreferredTimeCommand): Promise<void>;
}
