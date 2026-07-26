import {IUserClient} from '@/src/services/UserServices/IUserClient';
import {UserData} from '@/src/domain/UserData';
import {API_CONFIG} from '@/src/config/apiConfig';
import {graphqlRequest} from '@/src/services/graphql/graphqlFetch';

type UserDTO = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

const ENDPOINT = `${API_CONFIG.identityService}/graphql`;
const USER_FIELDS = `username email firstName lastName`;

function toUser(dto: UserDTO): UserData {
    return new UserData(dto.username, dto.email, dto.firstName, dto.lastName);
}

export class GraphqlUserClient implements IUserClient {
    async getCurrentUser(): Promise<UserData> {
        const data = await graphqlRequest<{currentUser: UserDTO}>(
            ENDPOINT,
            `query { currentUser { ${USER_FIELDS} } }`,
        );
        return toUser(data.currentUser);
    }

    async changeEmail(newEmail: string): Promise<UserData> {
        const data = await graphqlRequest<{changeEmail: UserDTO}>(
            ENDPOINT,
            `mutation($newEmail: String!) { changeEmail(newEmail: $newEmail) { ${USER_FIELDS} } }`,
            {newEmail},
        );
        return toUser(data.changeEmail);
    }

    async changePassword(oldPassword: string, newPassword: string): Promise<UserData> {
        const data = await graphqlRequest<{changePassword: UserDTO}>(
            ENDPOINT,
            `mutation($oldPassword: String!, $newPassword: String!) {
                changePassword(oldPassword: $oldPassword, newPassword: $newPassword) { ${USER_FIELDS} }
            }`,
            {oldPassword, newPassword},
        );
        return toUser(data.changePassword);
    }

    async changeName(newFirstName: string, newLastName: string): Promise<UserData> {
        const data = await graphqlRequest<{changeName: UserDTO}>(
            ENDPOINT,
            `mutation($newFirstName: String!, $newLastName: String!) {
                changeName(newFirstName: $newFirstName, newLastName: $newLastName) { ${USER_FIELDS} }
            }`,
            {newFirstName, newLastName},
        );
        return toUser(data.changeName);
    }

    async deleteUser(username: string): Promise<void> {
        await graphqlRequest(
            ENDPOINT,
            `mutation($username: String!) { deleteUser(username: $username) }`,
            {username},
        );
    }
}
