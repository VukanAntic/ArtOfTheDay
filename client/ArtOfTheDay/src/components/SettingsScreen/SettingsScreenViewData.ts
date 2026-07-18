import {UserData} from '@/src/domain/UserData';

export default class SettingsScreenViewData {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;

    constructor(user: UserData | null) {
        this.firstName = user?.firstName ?? '';
        this.lastName = user?.lastName ?? '';
        this.email = user?.email ?? '';
    }
}
