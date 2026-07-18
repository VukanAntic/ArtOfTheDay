import {useState} from 'react';
import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {router} from 'expo-router';
import {
    AccountIntent,
    ChangeEmailIntent,
    ChangeNameIntent,
    ChangePasswordIntent,
    DeleteAccountIntent,
} from '@/src/components/UserProfile/UserProfileController';
import SettingsScreenViewData from './SettingsScreenViewData';
import style from './SettingsScreenViewStyle';

type Props = {
    viewData: SettingsScreenViewData;
    width: number;
    onAccountIntent: (intent: AccountIntent) => void;
};

const PLACEHOLDER = 'rgba(255,255,255,0.4)';

export default function SettingsScreenView({viewData, width, onAccountIntent}: Props) {
    const [displayFirst, setDisplayFirst] = useState(viewData.firstName);
    const [displayLast, setDisplayLast] = useState(viewData.lastName);

    const [firstName, setFirstName] = useState(viewData.firstName);
    const [lastName, setLastName] = useState(viewData.lastName);
    const [email, setEmail] = useState(viewData.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const nameDisabled =
        firstName.trim() === '' ||
        lastName.trim() === '' ||
        (firstName.trim() === displayFirst && lastName.trim() === displayLast);
    const emailDisabled = email.trim() === '' || email.trim() === viewData.email;
    const passwordDisabled = oldPassword === '' || newPassword === '';

    const submitName = () => {
        if (nameDisabled) return;
        const first = firstName.trim();
        const last = lastName.trim();
        setDisplayFirst(first);
        setDisplayLast(last);
        onAccountIntent(new ChangeNameIntent(first, last));
    };

    const submitEmail = () => {
        if (emailDisabled) return;
        onAccountIntent(new ChangeEmailIntent(email.trim()));
    };

    const submitPassword = () => {
        if (passwordDisabled) return;
        onAccountIntent(new ChangePasswordIntent(oldPassword, newPassword));
        setOldPassword('');
        setNewPassword('');
    };

    const confirmDelete = () => {
        Alert.alert(
            'Delete account',
            'Are you sure you want to delete your account?',
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        onAccountIntent(new DeleteAccountIntent());
                        router.replace('/auth');
                    },
                },
            ],
        );
    };

    return (
        <View style={[style.container, {width}]}>
            <ScrollView
                style={style.scroll}
                contentContainerStyle={style.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={style.welcome}>Welcome back, {displayFirst} {displayLast}!</Text>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Name</Text>
                    <TextInput
                        style={style.input}
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="First name"
                        placeholderTextColor={PLACEHOLDER}
                    />
                    <TextInput
                        style={style.input}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Last name"
                        placeholderTextColor={PLACEHOLDER}
                    />
                    <TouchableOpacity
                        style={[style.button, nameDisabled && style.buttonDisabled]}
                        onPress={submitName}
                        disabled={nameDisabled}
                    >
                        <Text style={style.buttonText}>Save name</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Email</Text>
                    <TextInput
                        style={style.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        placeholderTextColor={PLACEHOLDER}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TouchableOpacity
                        style={[style.button, emailDisabled && style.buttonDisabled]}
                        onPress={submitEmail}
                        disabled={emailDisabled}
                    >
                        <Text style={style.buttonText}>Save email</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Password</Text>
                    <TextInput
                        style={style.input}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        placeholder="Current password"
                        placeholderTextColor={PLACEHOLDER}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={style.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="New password"
                        placeholderTextColor={PLACEHOLDER}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={[style.button, passwordDisabled && style.buttonDisabled]}
                        onPress={submitPassword}
                        disabled={passwordDisabled}
                    >
                        <Text style={style.buttonText}>Change password</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.deleteButton} onPress={confirmDelete}>
                    <Text style={style.deleteButtonText}>Delete account</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
