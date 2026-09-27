import {StyleSheet} from 'react-native';

export const CHEVRON_COLOR = 'rgba(255,255,255,0.45)';
export const CHEVRON_SIZE = 16;

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

    identity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 22,
        color: '#ffffff',
        fontFamily: 'Lato-BoldItalic',
    },
    identityText: {
        flex: 1,
        gap: 2,
    },
    identityName: {
        fontSize: 20,
        color: '#ffffff',
        fontFamily: 'Lato-Bold',
    },
    identityEmail: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.65)',
        fontFamily: 'Lato-Regular',
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
    list: {
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.35)',
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 16,
    },
    rowLabel: {
        fontSize: 15,
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
    },
    rowValue: {
        flex: 1,
        textAlign: 'right',
        fontSize: 15,
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Lato-Regular',
        marginRight: 10,
    },
    chevronOpen: {
        transform: [{rotate: '90deg'}],
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(255,255,255,0.16)',
        marginLeft: 16,
    },

    panel: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 10,
    },
    input: {
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.45)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.14)',
        paddingHorizontal: 14,
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
        fontSize: 15,
    },
    hint: {
        fontSize: 12,
        color: '#ff6b6b',
        fontFamily: 'Lato-Regular',
    },
    timeToggle: {
        height: 44,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeToggleText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'Lato-Regular',
    },
    saveButton: {
        alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    saveButtonDisabled: {
        opacity: 0.45,
    },
    saveButtonText: {
        color: '#000000',
        fontFamily: 'Lato-Bold',
        fontSize: 14,
    },

    deleteLink: {
        alignItems: 'center',
        paddingTop: 4,
    },
    deleteLinkText: {
        fontSize: 13,
        color: '#ff6b6b',
        fontFamily: 'Lato-Regular',
    },
});
