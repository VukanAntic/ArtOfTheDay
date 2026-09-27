import {FlatList, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import LikedArtScreenViewData from './LikedArtScreenViewData';
import style, {EMPTY_ICON_COLOR, EMPTY_ICON_SIZE} from './LikedArtScreenViewStyle';
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
                <Ionicons name="heart-outline" size={EMPTY_ICON_SIZE} color={EMPTY_ICON_COLOR}/>
                <Text style={style.emptyTitle}>No favourites yet</Text>
                <Text style={style.emptyBody}>Tap the heart on a painting to keep it here.</Text>
            </View>
        </View>
    );
}
