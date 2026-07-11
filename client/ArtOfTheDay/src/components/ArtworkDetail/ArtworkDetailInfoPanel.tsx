import {Text, TouchableOpacity, View} from 'react-native';
import s from './ArtworkDetailInfoPanelStyle';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(date: Date): string {
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

type ArtworkPanelData = {
    title: string;
    receivedAt: Date;
    description: string;
    artistName: string;
};

type Props = {
    artwork: ArtworkPanelData;
    isLiked?: boolean;
    onToggleLike?: () => void;
};

export default function ArtworkDetailInfoPanel({artwork, isLiked, onToggleLike}: Props) {
    return (
        <View>
            <View style={s.actionBar}>
                <Text style={s.actionBarDate}>{formatDate(artwork.receivedAt)}</Text>
                <View style={s.actionBarLine}/>
                <TouchableOpacity style={s.actionButton}>
                    <Text style={s.actionButtonText}>+</Text>
                </TouchableOpacity>
                <View style={s.actionBarLine}/>
                <TouchableOpacity style={s.actionButton} onPress={onToggleLike}>
                    <Text style={s.actionButtonText}>{isLiked ? '♥' : '♡'}</Text>
                </TouchableOpacity>
                <View style={s.actionBarLine}/>
                <TouchableOpacity style={s.actionButton}>
                    <Text style={s.actionButtonText}>↑</Text>
                </TouchableOpacity>
            </View>

            <View style={s.cardsContainer}>
                <View style={s.card}>
                    <Text style={s.label}>the painting</Text>
                    <Text style={s.cardTitle}>{artwork.title}</Text>
                    <Text style={s.artistName}>by {artwork.artistName}</Text>
                    <Text style={s.description}>{artwork.description}</Text>
                </View>
            </View>
        </View>
    );
}
