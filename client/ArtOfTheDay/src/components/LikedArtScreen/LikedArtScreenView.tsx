import {FlatList, View} from 'react-native';
import LikedArtScreenViewData from './LikedArtScreenViewData';
import style from './LikedArtScreenViewStyle';
import LikedArtworkCellView from "@/src/components/LikedArtworkCell/LikedArtworkCellView";

type Props = {
    viewData: LikedArtScreenViewData;
    width: number;
};

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
                renderItem={({item}) => <LikedArtworkCellView item={item}/>}
            />
        </View>
    );
}
