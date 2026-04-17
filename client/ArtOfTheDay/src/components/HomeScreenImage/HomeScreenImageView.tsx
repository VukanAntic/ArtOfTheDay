// src/views/ItemView.tsx
import {Image, Text, TouchableOpacity, View} from 'react-native';
import style from './HomeScreenImageViewStyle';
import HomeScreenImageViewData from "@/src/components/HomeScreenImage/HomeScreenImageViewData";

export default function HomeScreenImageView(data: HomeScreenImageViewData) {
    return (
        <View style={style.wrapper}>
            <View style={style.card}>
                <Image
                    source={{
                        uri: data.imageURL,
                        headers: {
                            'User-Agent': 'Mozilla/5.0',
                            'Referer': 'https://www.artic.edu/',
                        },
                    }}
                    style={style.image}
                />
            </View>

            {/* Overlay Icons */}
            <View style={style.overlay}>
                <TouchableOpacity style={style.iconButton}>
                    <Text style={style.iconText}>♡</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.iconButton}>
                    <Text style={style.iconText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}