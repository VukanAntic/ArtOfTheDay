import {ReactNode, useState} from 'react';
import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {
    AccountIntent,
    ChangeEmailIntent,
    ChangeNameIntent,
    ChangePasswordIntent,
    ChangePreferredTimeIntent,
    DeleteAccountIntent,
} from '@/src/components/UserProfile/UserProfileController';
import {FtueTimePickerViewData} from '@/src/components/FtueTimePicker/FtueTimePickerViewData';
import FtueTimePickerView from '@/src/components/FtueTimePicker/FtueTimePickerView';
import FtueTimePresetsView from '@/src/components/FtueTimePresets/FtueTimePresetsView';
import SettingsScreenViewData from './SettingsScreenViewData';
import style, {CHEVRON_COLOR, CHEVRON_SIZE} from './SettingsScreenViewStyle';

type Props = {
    viewData: SettingsScreenViewData;
    width: number;
    onAccountIntent: (intent: AccountIntent) => void;
};

type RowKey = 'name' | 'email' | 'password' | 'time';

const PLACEHOLDER = 'rgba(255,255,255,0.4)';

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

function Row({label, value, open, onPress}: {label: string; value: string; open: boolean; onPress: () => void}) {
    return (
        <TouchableOpacity style={style.row} activeOpacity={0.7} onPress={onPress}>
            <Text style={style.rowLabel}>{label}</Text>
            <Text style={style.rowValue} numberOfLines={1}>{value}</Text>
            <Ionicons
                name="chevron-forward"
                size={CHEVRON_SIZE}
                color={CHEVRON_COLOR}
                style={open ? style.chevronOpen : undefined}
            />
        </TouchableOpacity>
    );
}

function Panel({open, children}: {open: boolean; children: ReactNode}) {
    if (!open) return null;
    return <View style={style.panel}>{children}</View>;
}

function SaveButton({disabled, onPress}: {disabled: boolean; onPress: () => void}) {
    return (
        <TouchableOpacity
            style={[style.saveButton, disabled && style.saveButtonDisabled]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.85}
        >
            <Text style={style.saveButtonText}>Save</Text>
        </TouchableOpacity>
    );
}

export default function SettingsScreenView({viewData, width, onAccountIntent}: Props) {
    const [displayFirst, setDisplayFirst] = useState(viewData.firstName);
    const [displayLast, setDisplayLast] = useState(viewData.lastName);
    const [displayEmail, setDisplayEmail] = useState(viewData.email);

    const [firstName, setFirstName] = useState(viewData.firstName);
    const [lastName, setLastName] = useState(viewData.lastName);
    const [email, setEmail] = useState(viewData.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [timeDraft, setTimeDraft] = useState<FtueTimePickerViewData>(viewData.preferredTime);
    const [exactTime, setExactTime] = useState(false);

    const [openRow, setOpenRow] = useState<RowKey | null>(null);

    const toggleRow = (row: RowKey) => {
        const next = openRow === row ? null : row;
        if (next === 'time') {
            setTimeDraft(viewData.preferredTime);
        }
        setOpenRow(next);
    };

    const nameDisabled =
        firstName.trim() === '' ||
        lastName.trim() === '' ||
        (firstName.trim() === displayFirst && lastName.trim() === displayLast);
    const emailDisabled = email.trim() === '' || email.trim() === displayEmail;
    const passwordMismatch = confirmPassword !== '' && newPassword !== confirmPassword;
    const passwordDisabled =
        oldPassword === '' || newPassword === '' || confirmPassword === '' || newPassword !== confirmPassword;
    const timeDisabled = viewData.preferredTime.equals(timeDraft);

    const initials = `${displayFirst.charAt(0)}${displayLast.charAt(0)}`.toUpperCase();

    const submitName = () => {
        if (nameDisabled) return;
        const first = firstName.trim();
        const last = lastName.trim();
        setDisplayFirst(first);
        setDisplayLast(last);
        setOpenRow(null);
        onAccountIntent(new ChangeNameIntent(first, last));
    };

    const submitEmail = () => {
        if (emailDisabled) return;
        const next = email.trim();
        setDisplayEmail(next);
        setOpenRow(null);
        onAccountIntent(new ChangeEmailIntent(next));
    };

    const submitPassword = () => {
        if (passwordDisabled) return;
        onAccountIntent(new ChangePasswordIntent(oldPassword, newPassword));
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setOpenRow(null);
    };

    const submitTime = () => {
        if (timeDisabled) return;
        setExactTime(false);
        setOpenRow(null);
        onAccountIntent(new ChangePreferredTimeIntent(timeDraft));
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
                <View style={style.identity}>
                    <View style={style.avatar}>
                        {viewData.profileImageUrl ? (
                            <Image
                                source={{uri: viewData.profileImageUrl, headers: imageHeaders}}
                                style={style.avatarImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <Text style={style.avatarText}>{initials}</Text>
                        )}
                    </View>
                    <View style={style.identityText}>
                        <Text style={style.identityName} numberOfLines={1}>{displayFirst} {displayLast}</Text>
                        <Text style={style.identityEmail} numberOfLines={1}>{displayEmail}</Text>
                    </View>
                </View>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Account</Text>
                    <View style={style.list}>
                        <Row
                            label="Name"
                            value={`${displayFirst} ${displayLast}`}
                            open={openRow === 'name'}
                            onPress={() => toggleRow('name')}
                        />
                        <Panel open={openRow === 'name'}>
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
                            <SaveButton disabled={nameDisabled} onPress={submitName}/>
                        </Panel>

                        <View style={style.divider}/>

                        <Row
                            label="Email"
                            value={displayEmail}
                            open={openRow === 'email'}
                            onPress={() => toggleRow('email')}
                        />
                        <Panel open={openRow === 'email'}>
                            <TextInput
                                style={style.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                placeholderTextColor={PLACEHOLDER}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <SaveButton disabled={emailDisabled} onPress={submitEmail}/>
                        </Panel>

                        <View style={style.divider}/>

                        <Row
                            label="Password"
                            value="••••••••"
                            open={openRow === 'password'}
                            onPress={() => toggleRow('password')}
                        />
                        <Panel open={openRow === 'password'}>
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
                            <TextInput
                                style={style.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Repeat new password"
                                placeholderTextColor={PLACEHOLDER}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                            {passwordMismatch && <Text style={style.hint}>Passwords do not match.</Text>}
                            <SaveButton disabled={passwordDisabled} onPress={submitPassword}/>
                        </Panel>
                    </View>
                </View>

                <View style={style.section}>
                    <Text style={style.sectionTitle}>Delivery</Text>
                    <View style={style.list}>
                        <Row
                            label="Daily delivery"
                            value={viewData.preferredTime.format()}
                            open={openRow === 'time'}
                            onPress={() => toggleRow('time')}
                        />
                        <Panel open={openRow === 'time'}>
                            {exactTime ? (
                                <>
                                    <FtueTimePickerView value={timeDraft} onChange={setTimeDraft}/>
                                    <TouchableOpacity
                                        style={style.timeToggle}
                                        onPress={() => setExactTime(false)}
                                        activeOpacity={0.85}
                                    >
                                        <Text style={style.timeToggleText}>Back to suggested times</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <FtueTimePresetsView value={timeDraft} onSelect={setTimeDraft}/>
                                    <TouchableOpacity
                                        style={style.timeToggle}
                                        onPress={() => setExactTime(true)}
                                        activeOpacity={0.85}
                                    >
                                        <Text style={style.timeToggleText}>Pick an exact time</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                            <SaveButton disabled={timeDisabled} onPress={submitTime}/>
                        </Panel>
                    </View>
                </View>

                <TouchableOpacity style={style.deleteLink} onPress={confirmDelete} activeOpacity={0.7}>
                    <Text style={style.deleteLinkText}>Delete account</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
