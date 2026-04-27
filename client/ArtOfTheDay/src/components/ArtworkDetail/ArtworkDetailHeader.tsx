import {Text, TouchableOpacity, View} from 'react-native';
import style from './ArtworkDetailHeaderStyle';

type Props = {
    onClose: () => void;
};

export default function ArtworkDetailHeader({onClose}: Props) {
    return (
        <View style={style.container}>
            <TouchableOpacity style={style.backButton} onPress={onClose}>
                <Text style={style.backIcon}>‹</Text>
            </TouchableOpacity>
            <View style={style.titleContainer}>
                <Text style={style.title}>INSPIRA</Text>
                <Text style={style.subtitle}>daily</Text>
            </View>
            <TouchableOpacity style={style.profileButton}>
                <Text style={style.profileIcon}>◉</Text>
            </TouchableOpacity>
        </View>
    );
}
