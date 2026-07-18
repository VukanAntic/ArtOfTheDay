export interface GetCurrentUserCommand {}

export interface ChangeEmailCommand {
    newEmail: string;
}

export interface ChangePasswordCommand {
    oldPassword: string;
    newPassword: string;
}

export interface ChangeNameCommand {
    newFirstName: string;
    newLastName: string;
}

export interface DeleteUserCommand {
    username: string;
}
