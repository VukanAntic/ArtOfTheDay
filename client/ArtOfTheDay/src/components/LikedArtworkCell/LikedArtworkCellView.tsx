import {Image, Text, View} from "react-native";
import style from "@/src/components/LikedArtworkCell/LikedArtworkCellViewStyle";
import {LikedArtworkCellViewData} from "@/src/components/LikedArtworkCell/LikedArtworkCellViewData";

export default function LikedArtworkCellView({item}: { item: LikedArtworkCellViewData }) {
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