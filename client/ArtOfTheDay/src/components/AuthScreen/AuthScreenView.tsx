import {useEffect, useMemo, useRef, useState} from 'react';
import {
    Animated,
    ImageSourcePropType,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LoginCommand, RegisterCommand} from '@/src/services/AuthServices/AuthCommands';
import authBackgroundImages from '@/src/config/authBackgroundImages';
import {useAuthScreenController} from '@/src/hooks/useAuthScreenController';
import style from './AuthScreenViewStyle';

const CYCLE_INTERVAL_MS = 5000;
const FADE_DURATION_MS = 1500;

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function BackgroundCycler() {
    const {top} = useSafeAreaInsets();
    const {width, height} = useWindowDimensions();
    const images: ImageSourcePropType[] = useMemo(() => shuffle(authBackgroundImages), []);
    const indexRef = useRef(0);
    const [imageA, setImageA] = useState<ImageSourcePropType | undefined>(images[0]);
    const [imageB, setImageB] = useState<ImageSourcePropType | undefined>(images.length > 1 ? images[1] : undefined);
    const bOpacity = useRef(new Animated.Value(0)).current;
    const aIsCurrentRef = useRef(true);

    useEffect(() => {
        if (images.length < 2) return;

        const interval = setInterval(() => {
            const nextIdx = (indexRef.current + 1) % images.length;
            indexRef.current = nextIdx;
            const afterIdx = (nextIdx + 1) % images.length;

            if (aIsCurrentRef.current) {
                // A is showing — fade B in, then update A while it's hidden underneath
                Animated.timing(bOpacity, {
                    toValue: 1,
                    duration: FADE_DURATION_MS,
                    useNativeDriver: true,
                }).start(() => {
                    setImageA(images[afterIdx]);
                    aIsCurrentRef.current = false;
                });
            } else {
                // B is showing — fade B out (revealing A), then update B while it's hidden
                Animated.timing(bOpacity, {
                    toValue: 0,
                    duration: FADE_DURATION_MS,
                    useNativeDriver: true,
                }).start(() => {
                    setImageB(images[afterIdx]);
                    aIsCurrentRef.current = true;
                });
            }
        }, CYCLE_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [images]);

    if (!imageA) return null;

    const imgStyle = {width, height: height + top};

    return (
        <View style={[StyleSheet.absoluteFillObject, {top: -top}]}>
            <Animated.Image source={imageA} style={imgStyle} blurRadius={6} resizeMode="cover"/>
            {imageB && <Animated.Image source={imageB} style={[imgStyle, {opacity: bOpacity, position: 'absolute', top: 0, left: 0}]} blurRadius={6} resizeMode="cover"/>}
            <View style={[StyleSheet.absoluteFillObject, style.overlay]}/>
        </View>
    );
}

function LoginForm({onSubmit, disabled}: { onSubmit: (c: LoginCommand) => void; disabled: boolean }) {
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
                onPress={() => onSubmit({username, password})}
                disabled={disabled}
            >
                <Text style={style.submitButtonText}>{disabled ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
        </>
    );
}

function RegisterForm({onSubmit, disabled}: { onSubmit: (c: RegisterCommand) => void; disabled: boolean }) {
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
                onPress={() => onSubmit({firstName, lastName, username, email, password, confirmPassword})}
                disabled={disabled}
            >
                <Text style={style.submitButtonText}>{disabled ? 'Registering...' : 'Register'}</Text>
            </TouchableOpacity>
        </>
    );
}

export default function AuthScreenView() {
    const {viewData, onLogin, onRegister} = useAuthScreenController();
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    return (
        <View style={style.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <BackgroundCycler/>

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
                        ? <LoginForm onSubmit={onLogin} disabled={viewData.isLoading}/>
                        : <RegisterForm onSubmit={onRegister} disabled={viewData.isLoading}/>
                    }
                    {viewData.error && <Text style={style.error}>{viewData.error}</Text>}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

