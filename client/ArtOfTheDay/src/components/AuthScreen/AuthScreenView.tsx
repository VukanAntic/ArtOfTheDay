import {useState} from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewProps} from '@/src/mvc/ViewController';
import authBackgroundImages from '@/src/config/authBackgroundImages';
import BackgroundCyclerView from '@/src/components/BackgroundCycler/BackgroundCyclerView';
import {BackgroundCyclerViewData} from '@/src/components/BackgroundCycler/BackgroundCyclerViewData';
import AuthScreenViewData, {AuthScreenIntent, LoginIntent, RegisterIntent} from '@/src/components/AuthScreen/AuthScreenViewData';
import style from './AuthScreenViewStyle';

function LoginForm({onSubmit, disabled}: { onSubmit: (intent: AuthScreenIntent) => void; disabled: boolean }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <TextInput
                style={style.input}
                placeholder="Username"
                placeholderTextColor="rgba(255,255,255,0.6)"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={style.input}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.6)"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={[style.submitButton, disabled && style.submitButtonDisabled]}
                onPress={() => onSubmit(new LoginIntent(username, password))}
                disabled={disabled}
            >
                <Text style={style.submitButtonText}>{disabled ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
        </>
    );
}

function RegisterForm({onSubmit, disabled}: { onSubmit: (intent: AuthScreenIntent) => void; disabled: boolean }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <>
            <TextInput style={style.input} placeholder="First name" placeholderTextColor="rgba(255,255,255,0.6)" value={firstName} onChangeText={setFirstName}/>
            <TextInput style={style.input} placeholder="Last name" placeholderTextColor="rgba(255,255,255,0.6)" value={lastName} onChangeText={setLastName}/>
            <TextInput style={style.input} placeholder="Username" placeholderTextColor="rgba(255,255,255,0.6)" autoCapitalize="none" value={username} onChangeText={setUsername}/>
            <TextInput style={style.input} placeholder="Email" placeholderTextColor="rgba(255,255,255,0.6)" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}/>
            <TextInput style={style.input} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.6)" secureTextEntry value={password} onChangeText={setPassword}/>
            <TextInput style={style.input} placeholder="Confirm password" placeholderTextColor="rgba(255,255,255,0.6)" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword}/>
            <TouchableOpacity
                style={[style.submitButton, disabled && style.submitButtonDisabled]}
                onPress={() => onSubmit(new RegisterIntent(firstName, lastName, username, email, password, confirmPassword))}
                disabled={disabled}
            >
                <Text style={style.submitButtonText}>{disabled ? 'Registering...' : 'Register'}</Text>
            </TouchableOpacity>
        </>
    );
}

export default function AuthScreenView({viewData, send}: ViewProps<AuthScreenViewData, AuthScreenIntent>) {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const insets = useSafeAreaInsets();

    return (
        <View style={style.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <BackgroundCyclerView
                viewData={new BackgroundCyclerViewData(authBackgroundImages, 6, 'rgba(0,0,0,0.38)', -insets.top)}
            />

            <KeyboardAvoidingView
                style={style.content}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={style.header}>
                    <Text style={style.title}>INSPIRA</Text>
                    <Text style={style.subtitle}>daily</Text>
                </View>

                <View style={style.tabs}>
                    <TouchableOpacity style={[style.tab, activeTab === 'login' && style.tabActive]} onPress={() => setActiveTab('login')}>
                        <Text style={[style.tabText, activeTab === 'login' && style.tabTextActive]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.tab, activeTab === 'register' && style.tabActive]} onPress={() => setActiveTab('register')}>
                        <Text style={[style.tabText, activeTab === 'register' && style.tabTextActive]}>Register</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={style.form}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {activeTab === 'login'
                        ? <LoginForm onSubmit={send} disabled={viewData.isLoading}/>
                        : <RegisterForm onSubmit={send} disabled={viewData.isLoading}/>
                    }
                    {viewData.error && <Text style={style.error}>{viewData.error}</Text>}
                </ScrollView>
            </KeyboardAvoidingView>

            {viewData.isLoading && (
                <View style={[StyleSheet.absoluteFillObject, {top: -insets.top, bottom: -insets.bottom, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}]}>
                    <ActivityIndicator size="large" color="#ffffff"/>
                </View>
            )}
        </View>
    );
}
