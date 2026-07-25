import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#e6e4e0',
        paddingTop: 18,
        paddingBottom: 26,
        alignItems: 'center',
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    brand: {
        fontSize: 26,
        color: '#1a1a1a',
        fontFamily: 'Lato-BoldItalic',
        letterSpacing: 3,
    },
    titleContainer: {
        // height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 16,
    },
    brandSub: {
        fontSize: 12,
        color: '#8a8781',
        fontFamily: 'Lato-Italic',
        letterSpacing: 2,
        marginTop: -2,
    },
    body: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 28,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progress: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
    },
    progressSegment: {
        width: 8,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#d6d4d0',
    },
    progressSegmentActive: {
        width: 28,
        backgroundColor: '#1a1a1a',
    },
    progressSegmentDone: {
        backgroundColor: '#1a1a1a',
    },
    title: {
        fontSize: 23,
        color: '#1a1a1a',
        fontFamily: 'Lato-BoldItalic',
        textAlign: 'center',
        lineHeight: 29,
    },
    subtitle: {
        fontSize: 13,
        color: '#999999',
        fontFamily: 'Lato-Italic',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 28,
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 8,
    },
    cta: {
        height: 52,
        borderRadius: 14,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctaDisabled: {
        backgroundColor: '#e0dedb',
    },
    ctaText: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'Lato-BoldItalic',
    },
    ctaTextDisabled: {
        color: '#b3b1ac',
    },
});
