import {UserData} from '@/src/domain/UserData';

export interface IUserClient {
    getCurrentUser(): Promise<UserData>;
    changeEmail(newEmail: string): Promise<UserData>;
    changePassword(oldPassword: string, newPassword: string): Promise<UserData>;
    changeName(newFirstName: string, newLastName: string): Promise<UserData>;
    deleteUser(username: string): Promise<void>;
}
