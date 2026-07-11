import {Image, Text, TouchableOpacity, View} from "react-native";
import style from "@/src/components/LikedArtworkCell/LikedArtworkCellViewStyle";
import {LikedArtworkCellViewData} from "@/src/components/LikedArtworkCell/LikedArtworkCellViewData";
import DetailedArtworkPopupViewData from "@/src/components/DetailedArtworkPopup/DetailedArtworkPopupViewData";

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type Props = {
    item: LikedArtworkCellViewData;
    onPress: (popupData: DetailedArtworkPopupViewData) => void;
};

export default function LikedArtworkCellView({item, onPress}: Props) {
    return (
        <TouchableOpacity style={style.cell} onPress={() => onPress(item.popupData)}>
            <View style={style.imageBox}>
                {item.imageUrl ? (
                    <Image
                        source={{uri: item.imageUrl, headers: imageHeaders}}
                        style={style.image}
                        resizeMode="cover"
                    />
                ) : null}
            </View>
            <Text style={style.dateLabel}>{item.dateLabel}</Text>
        </TouchableOpacity>
    );
}
