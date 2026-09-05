import {StyleSheet} from 'react-native';

export const LABEL_GRADIENT = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)'] as const;
export const LABEL_GRADIENT_LOCATIONS = [0, 0.62] as const;

export default StyleSheet.create({
    grid: {
        gap: 12,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    tile: {
        flex: 1,
        aspectRatio: 0.86,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.10)',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    tileSelected: {
        borderColor: '#ffffff',
        transform: [{scale: 1.03}],
    },
    tileContent: {
        flex: 1,
    },
    tileDimmed: {
        opacity: 0.55,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    labelOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    title: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Lato-BoldItalic',
    },
    artist: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 10,
        fontFamily: 'Lato-Italic',
    },
});
