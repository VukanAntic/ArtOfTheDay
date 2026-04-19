// src/views/styles/HomeScreenImageStyles.ts
import {Dimensions, StyleSheet} from 'react-native';


const {width} = Dimensions.get('window');
const cardWidth = width - 64;

export default StyleSheet.create({
    wrapper: {
        width: cardWidth,
        alignSelf: 'center',
        height: 536,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: 125,
        overflow: 'hidden',
        width: 268,
        height: 536,
    },
    image: {
        width: '100%',
        aspectRatio: 2 / 3,
    },
    overlay: {
        position: 'absolute',
        bottom: 24,
        right: 16,
        alignItems: 'center',
        gap: 10,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: '#fff',
        fontSize: 18,
    }
});