// src/views/ItemView.tsx
import { View, Text, Image } from 'react-native';
import style from './HomeScreenImageViewStyle';

export default function HomeScreenImageView({ title, description, imageUrl }: {
    title: string;
    description: string;
    imageUrl: string;
}) {
    return (
        <View style={style.card}>
            <Image
                source={{
                    uri: imageUrl,
                    headers: {
                        'User-Agent': 'Mozilla/5.0',
                        'Referer': 'https://www.artic.edu/',
                    },
                }}
                style={style.image}
            />
            <Text style={style.title}>{title}</Text>
        <Text style={style.desc}>{description}</Text>
        </View>
);
}