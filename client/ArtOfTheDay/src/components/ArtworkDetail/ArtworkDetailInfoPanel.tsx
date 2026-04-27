import {Text, TouchableOpacity, View} from 'react-native';
import s from './ArtworkDetailInfoPanelStyle';
import FeaturedArtworkViewData from '@/src/components/FeaturedArtwork/FeaturedArtworkViewData';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(date: Date): string {
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

type Props = {
    artwork: FeaturedArtworkViewData;
};

export default function ArtworkDetailInfoPanel({artwork}: Props) {
    return (
        <View>
            <View style={s.actionBar}>
                <Text style={s.actionBarDate}>{formatDate(artwork.receivedAt)}</Text>
                <View style={s.actionBarLine}/>
                <TouchableOpacity style={s.actionButton}>
                    <Text style={s.actionButtonText}>+</Text>
                </TouchableOpacity>
                <View style={s.actionBarLine}/>
                <TouchableOpacity style={s.actionButton}>
                    <Text style={s.actionButtonText}>♡</Text>
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
                    <Text style={s.year}>{artwork.year}</Text>
                    <Text style={s.description}>{artwork.paintingDescription}</Text>
                </View>

                <View style={s.card}>
                    <Text style={s.label}>the artist</Text>
                    <Text style={s.cardTitle}>{artwork.artistName}</Text>
                    <Text style={s.year}>{artwork.artistLifespan}</Text>
                    <Text style={s.description}>{artwork.artistDescription}</Text>
                </View>
            </View>
        </View>
    );
}
