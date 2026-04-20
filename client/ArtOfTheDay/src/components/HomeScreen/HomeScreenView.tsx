import {View} from 'react-native';
import FeaturedArtworkViewData from "@/src/components/FeaturedArtwork/FeaturedArtworkViewData";
import FeaturedArtworksListView from "@/src/components/FeaturedArtworksList/FeaturedArtworksListView";

const listData = [
    new FeaturedArtworkViewData('1', 'ee', 'ee', 'https://www.artic.edu/iiif/2/8f5f8f8f-8765-b04e-8ffa-f4379d9511f5/full/843,/0/default.jpg'),
    new FeaturedArtworkViewData('2', 'ee', 'ee', 'https://www.artic.edu/iiif/2/5a047a1c-d36e-e88d-05e7-845d3936159b/full/843,/0/default.jpg'),
    new FeaturedArtworkViewData('3', 'ee', 'ee', 'https://www.artic.edu/iiif/2/beeba230-022f-449a-a2fd-c0cf6c47d232/full/843,/0/default.jpg'),
];

export default function HomeScreenView() {
    return (
        <View style={{flex: 1}}>
            <FeaturedArtworksListView
                artworkViews={listData}
            />
        </View>
    );
}