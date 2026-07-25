import {FlatList, Text, View} from 'react-native';
import LikedArtScreenViewData from './LikedArtScreenViewData';
import style from './LikedArtScreenViewStyle';
import LikedArtworkCellView from "@/src/components/LikedArtworkCell/LikedArtworkCellView";
import DetailedArtworkPopupViewData from "@/src/components/DetailedArtworkPopup/DetailedArtworkPopupViewData";

type Props = {
    viewData: LikedArtScreenViewData;
    width: number;
    onItemPress: (popupData: DetailedArtworkPopupViewData) => void;
};

export default function LikedArtScreenView({viewData, width, onItemPress}: Props) {
    return (
        <View style={[style.container, {width}]}>
            <View>
                <FlatList
                    data={viewData.items}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    columnWrapperStyle={style.row}
                    contentContainerStyle={style.list}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <LikedArtworkCellView item={item} onPress={onItemPress}/>}
                />
            </View>
            <View style={[style.emptyState, {display: viewData.items.length !== 0 ? 'none' : 'flex'}]}>
                <Text style={style.emptyText}>This seems a bit empty!</Text>
            </View>
        </View>
    );
}
