import {Image, View} from 'react-native';
import style from './FeaturedArtworkViewStyle';
import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";
import FeaturedArtworkQuickActionsView
    from "@/src/components/FeaturedArtworkQuickActions/FeaturedArtworkQuickActionsView";

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type Props = FeaturedArtworkViewData & { onSeeMore: () => void };

export default function FeaturedArtworkView({imageURL, onSeeMore}: Props) {
    const imageSource = {
        uri: imageURL,
        headers: imageHeaders,
    };

    return (
        <View style={style.centerContainer}>
            <View style={style.cardContainer}>
                <Image
                    source={imageSource}
                    style={style.card}
                    resizeMode="cover"
                />
                <View>
                    <FeaturedArtworkQuickActionsView isImageLiked={true} onSeeMore={onSeeMore}/>
                </View>
            </View>
        </View>
    );
}