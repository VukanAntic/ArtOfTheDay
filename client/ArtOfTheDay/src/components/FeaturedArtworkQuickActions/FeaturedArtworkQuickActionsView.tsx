import {Image, Text, TouchableOpacity, View} from 'react-native';
import style from "./FeaturedArtworkQuickActionsViewStyle";
import FeaturedArtworkQuickActionsViewData
    from "@/src/components/FeaturedArtworkQuickActions/FeaturedArtworkQuickActionsViewData";

export default function FeaturedArtworkQuickActionsView(data: FeaturedArtworkQuickActionsViewData) {
    return (
        <View style={style.wrapper}>
            <Image source={require('@/assets/images/FeaturedArtworkQuickActionLines.png')}/>
            <TouchableOpacity style={style.likeButton}>
                <Text
                    style={data.isImageLiked ? style.likedButtonText : style.notYetLikedButtonText}>{data.isImageLiked ? '♥' : '♡'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.seeMoreButton} onPress={data.onSeeMore}>
                <Text style={style.iconText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}