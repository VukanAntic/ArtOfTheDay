export default class AuthScreenViewData {
    constructor(
        readonly isLoading: boolean,
        readonly error: string | null,
    ) {}
}

export class LoginIntent {
    constructor(
        readonly username: string,
        readonly password: string,
    ) {}
}

export class RegisterIntent {
    constructor(
        readonly firstName: string,
        readonly lastName: string,
        readonly username: string,
        readonly email: string,
        readonly password: string,
        readonly confirmPassword: string,
    ) {}
}

export type AuthScreenIntent = LoginIntent | RegisterIntent;
