import {StyleSheet} from 'react-native';

export const ITEM_HEIGHT = 44;
export const VISIBLE_COUNT = 3;

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#e0ded9',
        borderRadius: 16,
        height: ITEM_HEIGHT * VISIBLE_COUNT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    selectionBand: {
        position: 'absolute',
        left: 14,
        right: 14,
        top: ITEM_HEIGHT,
        height: ITEM_HEIGHT,
        backgroundColor: '#f5f4f1',
        borderRadius: 10,
    },
    wheel: {
        flex: 1,
        height: ITEM_HEIGHT * VISIBLE_COUNT,
    },
    wheelContent: {
        paddingVertical: ITEM_HEIGHT,
    },
    item: {
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
        color: '#c9c7c2',
        fontFamily: 'Lato-Regular',
    },
    itemTextActive: {
        fontSize: 20,
        color: '#1a1a1a',
        fontFamily: 'Lato-Bold',
    },
    separator: {
        fontSize: 20,
        color: '#1a1a1a',
        fontFamily: 'Lato-Bold',
        marginHorizontal: 2,
    },
});
