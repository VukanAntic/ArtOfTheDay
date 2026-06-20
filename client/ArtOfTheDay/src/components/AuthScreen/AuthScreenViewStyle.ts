import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
    },
    header: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
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
    tabs: {
        flexDirection: 'row',
        marginHorizontal: 32,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.35)',
        padding: 4,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    tabActive: {
        backgroundColor: 'rgba(255,255,255,0.22)',
    },
    tabText: {
        color: 'rgba(255,255,255,0.65)',
        fontFamily: 'Lato-Regular',
        fontSize: 15,
    },
    tabTextActive: {
        color: '#fff',
        fontFamily: 'Lato-Bold',
    },
    form: {
        paddingHorizontal: 32,
        paddingTop: 16,
        paddingBottom: 48,
        gap: 14,
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
    error: {
        color: '#ff6b6b',
        fontFamily: 'Lato-Regular',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 4,
    },
    submitButton: {
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitButtonText: {
        color: '#000',
        fontFamily: 'Lato-Bold',
        fontSize: 15,
    },
    bg: {},
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.38)',
    },
});
