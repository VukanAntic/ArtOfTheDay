import {StyleSheet} from 'react-native';

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
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#eceae6',
        borderWidth: 3,
        borderColor: 'transparent',
    },
    tileSelected: {
        borderColor: '#1a1a1a',
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
        backgroundColor: 'rgba(0,0,0,0.35)',
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
    checkBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkText: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 16,
        fontFamily: 'Lato-Bold',
    },
});
