import {memo, useEffect, useMemo, useState} from 'react';
import {Image, View} from 'react-native';
import style from './FeaturedArtworkViewStyle';
import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";
import FeaturedArtworkQuickActionsView
    from "@/src/components/FeaturedArtworkQuickActions/FeaturedArtworkQuickActionsView";
import {ArtworkPreferenceIntent} from "@/src/services/PreferenceServices/ArtworkPreferenceIntent";

const imageHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://www.artic.edu/',
};

type Props = FeaturedArtworkViewData & {
    onSeeMore: () => void;
    onPreferenceIntent: (intent: ArtworkPreferenceIntent) => void;
};

function FeaturedArtworkView({id, imageURL, isLiked, onSeeMore, onPreferenceIntent}: Props) {
    console.log('[FeaturedArtworkView] render', imageURL);
    const imageSource = useMemo(() => ({uri: imageURL, headers: imageHeaders}), [imageURL]);
    const [liked, setLiked] = useState(isLiked);

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);

    const onToggleLike = () => {
        const next = !liked;
        setLiked(next);
        onPreferenceIntent({type: next ? 'LIKE' : 'UNLIKE', artworkId: Number(id)});
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
                    <FeaturedArtworkQuickActionsView isImageLiked={liked} onToggleLike={onToggleLike} onSeeMore={onSeeMore}/>
                </View>
            </View>
        </View>
    );
}

export default memo(FeaturedArtworkView, (prev, next) => prev.id === next.id && prev.imageURL === next.imageURL && prev.isLiked === next.isLiked);