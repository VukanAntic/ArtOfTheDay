import {StyleSheet} from 'react-native';

export const ICON_COLOR = 'rgba(255,255,255,0.6)';
export const ICON_COLOR_SELECTED = '#ffffff';
export const ICON_SIZE = 20;

export default StyleSheet.create({
    list: {
        gap: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        height: 60,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    cardSelected: {
        backgroundColor: 'rgba(255,255,255,0.22)',
        borderColor: 'rgba(255,255,255,0.45)',
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: 'rgba(255,255,255,0.85)',
        fontFamily: 'Lato-BoldItalic',
    },
    labelSelected: {
        color: '#ffffff',
    },
    time: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'Lato-Bold',
    },
    timeSelected: {
        color: '#ffffff',
    },
});
