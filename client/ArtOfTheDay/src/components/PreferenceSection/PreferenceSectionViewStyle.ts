import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        gap: 12,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Lato-Bold',
        color: '#1a1a1a',
    },

    chipsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        paddingLeft: 13,
        paddingRight: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#c8c6c2',
        backgroundColor: '#ffffff',
        gap: 6,
    },
    chipText: {
        fontSize: 13,
        fontFamily: 'Lato-Regular',
        color: '#1a1a1a',
    },
    chipRemove: {
        fontSize: 15,
        lineHeight: 18,
        color: '#888',
    },

    addRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    addInput: {
        flex: 1,
        height: 44,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d0ceca',
        backgroundColor: '#ffffff',
        paddingHorizontal: 14,
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        color: '#1a1a1a',
    },
    addButton: {
        height: 44,
        paddingHorizontal: 18,
        borderRadius: 10,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 14,
        fontFamily: 'Lato-Bold',
        color: '#ffffff',
        fontStyle: 'italic',
    },

    suggestionsContent: {
        gap: 7,
        paddingRight: 4,
    },
    suggestionChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#b0aea9',
        backgroundColor: 'transparent',
    },
    suggestionText: {
        fontSize: 12,
        fontFamily: 'Lato-Regular',
        color: '#555',
    },
});
