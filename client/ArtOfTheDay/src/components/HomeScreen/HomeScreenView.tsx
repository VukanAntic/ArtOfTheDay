// src/screens/HomeScreen.tsx

import {View} from 'react-native';
import FeaturedArtworkView from "@/src/components/FeaturedArtwork/FeaturedArtworkView";

export default function HomeScreenView() {
    return (
        <View style={{flex: 1, padding: 16}}>
            <FeaturedArtworkView
                title={'ee'}
                description={'ee'}
                imageURL={'https://www.artic.edu/iiif/2/8f5f8f8f-8765-b04e-8ffa-f4379d9511f5/full/843,/0/default.jpg'}
            />
        </View>
    );
}