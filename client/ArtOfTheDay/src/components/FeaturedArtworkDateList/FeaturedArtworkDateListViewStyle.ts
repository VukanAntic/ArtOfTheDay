import {StyleSheet} from 'react-native';

export const ITEM_WIDTH = 40;

export default StyleSheet.create({
    container: {
        height: 60,
        overflow: 'hidden',
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
});