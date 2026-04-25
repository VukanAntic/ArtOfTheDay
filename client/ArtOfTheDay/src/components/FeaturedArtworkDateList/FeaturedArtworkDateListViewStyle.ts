import {StyleSheet} from 'react-native';

export const ITEM_WIDTH = 40;

export default StyleSheet.create({
    container: {
        height: 60,
        overflow: 'hidden',
        // backgroundColor: '#fff',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    item: {
        width: ITEM_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    dateText: {
        color: '#fff',
        fontSize: 10,
        marginTop: 4,
    },
});