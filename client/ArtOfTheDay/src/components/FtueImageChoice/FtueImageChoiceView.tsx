import {Image, Text, TouchableOpacity, View} from 'react-native';
import {FtueImageChoiceViewData} from './FtueImageChoiceViewData';
import style from './FtueImageChoiceViewStyle';

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type Props = {
    tiles: FtueImageChoiceViewData[];
    selectedId: number | null;
    onSelect: (id: number) => void;
};

export default function FtueImageChoiceView({tiles, selectedId, onSelect}: Props) {
    const rows: FtueImageChoiceViewData[][] = [];
    for (let i = 0; i < tiles.length; i += 2) {
        rows.push(tiles.slice(i, i + 2));
    }

    return (
        <View style={style.grid}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={style.row}>
                    {row.map(tile => {
                        const selected = tile.id === selectedId;
                        return (
                            <TouchableOpacity
                                key={tile.id}
                                activeOpacity={0.85}
                                style={[style.tile, selected && style.tileSelected]}
                                onPress={() => onSelect(tile.id)}
                            >
                                <Image
                                    source={{uri: tile.imageUrl, headers: imageHeaders}}
                                    style={style.image}
                                    resizeMode="cover"
                                />
                                <View style={style.labelOverlay}>
                                    <Text style={style.title} numberOfLines={1}>{tile.title}</Text>
                                    <Text style={style.artist} numberOfLines={1}>{tile.artistName}</Text>
                                </View>
                                {selected && (
                                    <View style={style.checkBadge}>
                                        <Text style={style.checkText}>✓</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}
