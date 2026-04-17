// src/screens/HomeScreen.tsx

import { View } from 'react-native';
import HomeScreenImageView from "@/src/components/HomeScreenImage/HomeScreenImageView";

export default function HomeScreenView() {
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <HomeScreenImageView
                title="Mount Pelion"
                description="A beautiful mountain peninsula in Thessaly."
                imageUrl="https://www.artic.edu/iiif/2/4e074d70-4424-331b-ec89-0776a45d6825/full/843,/0/default.jpg"
            />
        </View>
    );
}