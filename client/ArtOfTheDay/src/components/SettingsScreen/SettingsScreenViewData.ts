import {UserData} from '@/src/domain/UserData';
import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';

export default class SettingsScreenViewData {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly preferredTime: FtueTimePickerViewData;

    constructor(user: UserData | null, preferredTime: FtueTimePickerViewData) {
        this.firstName = user?.firstName ?? '';
        this.lastName = user?.lastName ?? '';
        this.email = user?.email ?? '';
        this.preferredTime = preferredTime;
    }
}
