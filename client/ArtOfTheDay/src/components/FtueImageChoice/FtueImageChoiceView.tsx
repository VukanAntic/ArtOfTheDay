import {memo, useMemo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {FtueImageChoiceViewData} from './FtueImageChoiceViewData';
import style, {LABEL_GRADIENT, LABEL_GRADIENT_LOCATIONS} from './FtueImageChoiceViewStyle';

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type TileProps = {
    tile: FtueImageChoiceViewData;
    selected: boolean;
    dimmed: boolean;
    onSelect: (id: number) => void;
};

function Tile({tile, selected, dimmed, onSelect}: TileProps) {
    const imageSource = useMemo(() => ({uri: tile.imageUrl, headers: imageHeaders}), [tile.imageUrl]);

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={[style.tile, selected && style.tileSelected]}
            onPress={() => onSelect(tile.id)}
        >
            <View style={[style.tileContent, dimmed && style.tileDimmed]}>
                <Image source={imageSource} style={style.image} resizeMode="cover"/>
                <LinearGradient
                    colors={LABEL_GRADIENT}
                    locations={LABEL_GRADIENT_LOCATIONS}
                    style={style.labelOverlay}
                >
                    <Text style={style.title} numberOfLines={1}>{tile.title}</Text>
                    <Text style={style.artist} numberOfLines={1}>{tile.artistName}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
}

const MemoTile = memo(Tile, (prev, next) =>
    prev.tile.id === next.tile.id
    && prev.tile.imageUrl === next.tile.imageUrl
    && prev.tile.title === next.tile.title
    && prev.tile.artistName === next.tile.artistName
    && prev.selected === next.selected
    && prev.dimmed === next.dimmed
    && prev.onSelect === next.onSelect,
);

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

    const hasSelection = selectedId !== null;

    return (
        <View style={style.grid}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={style.row}>
                    {row.map(tile => (
                        <MemoTile
                            key={tile.id}
                            tile={tile}
                            selected={tile.id === selectedId}
                            dimmed={hasSelection && tile.id !== selectedId}
                            onSelect={onSelect}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
}
