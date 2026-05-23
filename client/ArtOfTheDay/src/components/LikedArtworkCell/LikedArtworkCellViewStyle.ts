import {Dimensions, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const GRID_PADDING = 10;
export const CELL_GAP = 5;
// Three columns with padding on each side and two gaps between cells
export const CELL_SIZE = (SCREEN_WIDTH - GRID_PADDING * 2 - CELL_GAP * 2) / 3;
export const IMAGE_HEIGHT = Math.round(CELL_SIZE * 1.2);

export default StyleSheet.create({
    cell: {
        width: CELL_SIZE,
    },
    imageBox: {
        width: CELL_SIZE,
        height: IMAGE_HEIGHT,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,0.15)',
        overflow: 'hidden',
    },
    image: {
        width: CELL_SIZE,
        height: IMAGE_HEIGHT,
    },
    dateLabel: {
        marginTop: 4,
        marginBottom: 2,
        fontSize: 11,
        color: '#000000',
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
    },
});
