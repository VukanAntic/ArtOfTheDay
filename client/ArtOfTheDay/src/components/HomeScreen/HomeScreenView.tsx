// src/screens/HomeScreen.tsx

import {View} from 'react-native';
import FeaturedArtworkView from "@/src/components/FeaturedArtwork/FeaturedArtworkView";

export default function HomeScreenView() {
    return (
        <View style={{flex: 1, padding: 16}}>
            <FeaturedArtworkView
                title={'ee'}
                description={'ee'}
                imageURL={'https://www.artic.edu/iiif/2/5a047a1c-d36e-e88d-05e7-845d3936159b/full/843,/0/default.jpg'}
            />
        </View>
    );
}