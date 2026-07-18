import {IUserClient} from '@/src/services/UserServices/IUserClient';
import {UserData} from '@/src/domain/UserData';
import {API_CONFIG} from '@/src/config/apiConfig';
import {restGet, restPost, restDelete} from '@/src/services/rest/restFetch';

type UserDTO = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

const BASE = `${API_CONFIG.identityService}/api/authentication`;

function toUser(dto: UserDTO): UserData {
    return new UserData(dto.username, dto.email, dto.firstName, dto.lastName);
}

export class RestUserClient implements IUserClient {
    async getCurrentUser(): Promise<UserData> {
        return toUser(await restGet<UserDTO>(`${BASE}/get-current-user`));
    }

    async changeEmail(newEmail: string): Promise<UserData> {
        return toUser(await restPost<{newEmail: string}, UserDTO>(`${BASE}/change-email`, {newEmail}));
    }

    async changePassword(oldPassword: string, newPassword: string): Promise<UserData> {
        return toUser(await restPost<{oldPassword: string; newPassword: string}, UserDTO>(`${BASE}/change-password`, {oldPassword, newPassword}));
    }

    async changeName(newFirstName: string, newLastName: string): Promise<UserData> {
        return toUser(await restPost<{newFirstName: string; newLastName: string}, UserDTO>(`${BASE}/change-first-and-last-name`, {newFirstName, newLastName}));
    }

    async deleteUser(username: string): Promise<void> {
        await restDelete<{username: string}, void>(`${BASE}/delete-user`, {username});
    }
}
