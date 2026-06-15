export interface LoginCommand {
    username: string;
    password: string;
}

export interface RegisterCommand {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}
