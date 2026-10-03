import {useCallback, useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import style from './ArtworkDetailHeaderStyle';
import {router, useFocusEffect} from "expo-router";

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type Props = {
    onClose?: () => void;
    backButtonOpacity?: any;
    /** URL of the currently active artwork — forwarded to the profile screen as background */
    backgroundImageUrl?: string;
    profileImageUrl?: string | null;
};

export default function ArtworkDetailHeader({onClose, backButtonOpacity, backgroundImageUrl, profileImageUrl}: Props) {

    const isOpeningProfile = useRef(false);

    useFocusEffect(useCallback(() => {
        isOpeningProfile.current = false;
    }, []));

    const goToUserProfile = () => {
        if (isOpeningProfile.current) return;
        isOpeningProfile.current = true;
        router.push({pathname: '/profile', params: {bg: backgroundImageUrl ?? ''}});
    };

    return (
        <View style={style.container}>
            <Animated.View style={[style.backSlot, backButtonOpacity]}>
                {onClose && (
                    <TouchableOpacity style={style.backButton} onPress={onClose}>
                        <Text style={style.backIcon}>‹</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>

            <View style={style.titleContainer}>
                <Text style={style.title}>INSPIRA</Text>
                <Text style={style.subtitle}>daily</Text>
            </View>

            <TouchableOpacity style={style.profileButton} onPress={goToUserProfile}>
                {profileImageUrl ? (
                    <Image
                        source={{uri: profileImageUrl, headers: imageHeaders}}
                        style={style.profileImage}
                        resizeMode="cover"
                    />
                ) : (
                    <Image source={require('@/assets/images/User/User_02.png')}/>
                )}
            </TouchableOpacity>
        </View>
    );
}
