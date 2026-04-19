// src/views/ItemView.tsx
import {Image, View} from 'react-native';
import style from './FeaturedArtworkViewStyle';
import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";
import FeaturedArtworkQuickActionsView
    from "@/src/components/FeaturedArtworkQuickActions/FeaturedArtworkQuickActionsView";

export default function FeaturedArtworkView(data: FeaturedArtworkViewData) {
    return (
        <View style={style.wrapper}>
            <Image
                source={{
                    uri: data.imageURL,
                    headers: {
                        'User-Agent': 'Mozilla/5.0',
                        'Referer': 'https://www.artic.edu/',
                    },
                }}
                style={style.card}
                resizeMode="cover"
            />
            <FeaturedArtworkQuickActionsView
                isImageLiked={true}
            />
        </View>
    );
}