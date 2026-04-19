import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const cardWidth = width - 64;

export default StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurredBackground: {
        ...StyleSheet.absoluteFillObject,
        transform: [{scale: 1.5}],
    },
    cardContainer: {
        width: cardWidth,
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
    },
});