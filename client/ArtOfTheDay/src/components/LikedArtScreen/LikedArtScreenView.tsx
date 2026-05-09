import {FlatList, Image, Text, View} from 'react-native';
import LikedArtScreenViewData, {LikedArtItemViewData} from './LikedArtScreenViewData';
import style from './LikedArtScreenViewStyle';

type Props = {
    viewData: LikedArtScreenViewData;
    width: number;
};

function ArtCell({item}: { item: LikedArtItemViewData }) {
    return (
        <View style={style.cell}>
            <View style={style.imageBox}>
                {item.imageUrl ? (
                    <Image
                        source={{uri: item.imageUrl}}
                        style={style.image}
                        resizeMode="cover"
                    />
                ) : null}
            </View>
            <Text style={style.dateLabel}>{item.dateLabel}</Text>
        </View>
    );
}

export default function LikedArtScreenView({viewData, width}: Props) {
    return (
        <View style={[style.container, {width}]}>
            <FlatList
                data={viewData.items}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={style.row}
                contentContainerStyle={style.list}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <ArtCell item={item}/>}
            />
        </View>
    );
}
