import {UserHistoryData} from '@/src/domain/UserHistoryData';
import {SetPreferredTimeCommand, SetTimeZoneCommand} from '@/src/services/NextImageServices/NextImageCommands';

export interface INextImageClient {
    getHistory(): Promise<UserHistoryData>;
    setPreferredTime(command: SetPreferredTimeCommand): Promise<void>;
    setTimeZone(command: SetTimeZoneCommand): Promise<void>;
}
