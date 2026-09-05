import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brand: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'Lato-BoldItalic',
    },
    brandSub: {
        fontSize: 13,
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
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
        backgroundColor: 'rgba(255,255,255,0.35)',
    },
    progressSegmentActive: {
        width: 28,
        backgroundColor: '#ffffff',
    },
    progressSegmentDone: {
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 23,
        color: '#ffffff',
        fontFamily: 'Lato-BoldItalic',
        textAlign: 'center',
        lineHeight: 29,
        textShadowColor: 'rgba(0,0,0,0.45)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 12,
    },
    subtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'Lato-Italic',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 28,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 8,
    },
    timeModeToggle: {
        height: 48,
        marginTop: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeModeToggleText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'Lato-Regular',
    },
    footer: {
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    cta: {
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    ctaDisabled: {
        opacity: 0.5,
    },
    ctaText: {
        fontSize: 15,
        color: '#000000',
        fontFamily: 'Lato-Bold',
    },
});
