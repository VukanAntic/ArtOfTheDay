import {Dimensions, StyleSheet} from 'react-native';
import {INDICATOR_HEIGHT} from '@/src/components/CurvedTabIndicator/CurvedTabIndicatorViewStyle';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const GRID_PADDING = 10;
export const CELL_GAP = 5;
// Three columns with padding on each side and two gaps between cells
export const CELL_SIZE = (SCREEN_WIDTH - GRID_PADDING * 2 - CELL_GAP * 2) / 3;
export const IMAGE_HEIGHT = Math.round(CELL_SIZE * 1.2);

export const EMPTY_ICON_COLOR = 'rgba(255,255,255,0.35)';
export const EMPTY_ICON_SIZE = 28;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    list: {
        padding: GRID_PADDING,
        gap: CELL_GAP,
    },
    emptyState: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingBottom: INDICATOR_HEIGHT,
        gap: 10,
    },
    emptyTitle: {
        fontSize: 22,
        color: '#ffffff',
        fontFamily: 'Lato-BoldItalic',
        textAlign: 'center',
    },
    emptyBody: {
        fontSize: 14,
        lineHeight: 21,
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
        maxWidth: 250,
    },
    row: {
        gap: CELL_GAP,
    },
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
        color: '#888',
        fontFamily: 'Lato-Regular',
        textAlign: 'center',
    },
});
