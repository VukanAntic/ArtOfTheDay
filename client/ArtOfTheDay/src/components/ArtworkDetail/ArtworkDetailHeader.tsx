import {Image, Text, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import style from './ArtworkDetailHeaderStyle';
import {router} from "expo-router";

type Props = {
    onClose?: () => void;
    backButtonOpacity?: any;
};

export default function ArtworkDetailHeader({onClose, backButtonOpacity}: Props) {

    const goToUserProfile = () => {
        router.push('/profile');
    };

    return (
        <View style={style.container}>
            <Animated.View style={backButtonOpacity}>
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
                <Image source={require('@/assets/images/User/User_02.png')}/>
            </TouchableOpacity>
        </View>
    );
}
