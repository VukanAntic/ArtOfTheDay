import {createClient} from '@connectrpc/connect';
import {IUserClient} from '@/src/services/UserServices/IUserClient';
import {UserData} from '@/src/domain/UserData';
import {UserGrpcService} from '@/src/services/grpc/gen/user_pb';
import {grpcTransport} from '@/src/services/grpc/grpcTransport';

export class GrpcUserClient implements IUserClient {
    private readonly client = createClient(UserGrpcService, grpcTransport);

    async getCurrentUser(): Promise<UserData> {
        const u = await this.client.currentUser({});
        return new UserData(u.username, u.email, u.firstName, u.lastName);
    }

    async changeEmail(newEmail: string): Promise<UserData> {
        const u = await this.client.changeEmail({newEmail});
        return new UserData(u.username, u.email, u.firstName, u.lastName);
    }

    async changePassword(oldPassword: string, newPassword: string): Promise<UserData> {
        const u = await this.client.changePassword({oldPassword, newPassword});
        return new UserData(u.username, u.email, u.firstName, u.lastName);
    }

    async changeName(newFirstName: string, newLastName: string): Promise<UserData> {
        const u = await this.client.changeName({newFirstName, newLastName});
        return new UserData(u.username, u.email, u.firstName, u.lastName);
    }

    async deleteUser(username: string): Promise<void> {
        await this.client.deleteUser({username});
    }
}
