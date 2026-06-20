import {useMemo, useState} from 'react';
import {router} from 'expo-router';
import {AuthScreenController} from '@/src/controllers/AuthScreenController';
import {loginCommandHandler, registerCommandHandler} from '@/src/composition/AppCompositionRoot';
import {LoginCommand, RegisterCommand} from '@/src/services/AuthServices/AuthCommands';
import AuthScreenViewData from '@/src/components/AuthScreen/AuthScreenViewData';

export function useAuthScreenController() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const controller = useMemo(() => new AuthScreenController(
        loginCommandHandler,
        registerCommandHandler,
    ), []);

    const handleLogin = async (command: LoginCommand) => {
        setIsLoading(true);
        setError(null);
        try {
            await controller.login(command);
            router.replace('/home');
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (command: RegisterCommand) => {
        setIsLoading(true);
        setError(null);
        try {
            await controller.register(command);
            router.replace('/home');
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        viewData: new AuthScreenViewData(isLoading, error),
        onLogin: handleLogin,
        onRegister: handleRegister,
    };
}
