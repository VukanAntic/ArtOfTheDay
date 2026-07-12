import {StyleSheet} from 'react-native';

export const TITLE_AREA_HEIGHT = 70;
export const ACTION_BAR_HEIGHT = 80;

export default StyleSheet.create({
    backgroundImage: {
        transform: [{scale: 1.5}],
    },
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        color: '#fff',
        fontSize: 22,
        lineHeight: 26,
        marginLeft: -2,
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontStyle: 'italic',
        fontFamily: 'Lato-Bold',
    },
    subtitle: {
        color: 'rgba(255,255,255,0.65)',
        fontSize: 13,
        fontFamily: 'Lato-Regular',
    },
    headerSpacer: {
        width: 36,
    },
    cardAreaFlex: {
        flex: 1,
    },
    titleArea: {
        marginTop: 40,
        height: TITLE_AREA_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingHorizontal: 20,
    },
    artistName: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 16,
        fontStyle: 'italic',
        fontFamily: 'Lato-Italic',
    },
    artworkTitle: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Lato-BoldItalic',
        textAlign: 'center',
    },
    actionBar: {
        height: ACTION_BAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        gap: 8,
    },
    actionBarLine: {
        width: 40,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.45)',
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        lineHeight: 22,
    },
});
