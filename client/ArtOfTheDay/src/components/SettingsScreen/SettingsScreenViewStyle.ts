import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 48,
        gap: 28,
    },
    welcome: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Lato-Bold',
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 14,
        fontFamily: 'Lato-Bold',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontSize: 15,
    },
    button: {
        marginTop: 4,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.45,
    },
    buttonText: {
        color: '#000',
        fontFamily: 'Lato-Bold',
        fontSize: 15,
    },
    deleteButton: {
        marginTop: 4,
        backgroundColor: 'rgba(214,54,54,0.92)',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontFamily: 'Lato-Bold',
        fontSize: 15,
    },
});
