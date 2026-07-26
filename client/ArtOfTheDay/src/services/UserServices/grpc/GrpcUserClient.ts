import {IUserClient} from '@/src/services/UserServices/IUserClient';
import {UserData} from '@/src/domain/UserData';

export class GrpcUserClient implements IUserClient {
    getCurrentUser(): Promise<UserData> {
        throw new Error('gRPC not yet implemented');
    }

    changeEmail(_newEmail: string): Promise<UserData> {
        throw new Error('gRPC not yet implemented');
    }

    changePassword(_oldPassword: string, _newPassword: string): Promise<UserData> {
        throw new Error('gRPC not yet implemented');
    }

    changeName(_newFirstName: string, _newLastName: string): Promise<UserData> {
        throw new Error('gRPC not yet implemented');
    }

    deleteUser(_username: string): Promise<void> {
        throw new Error('gRPC not yet implemented');
    }
}
