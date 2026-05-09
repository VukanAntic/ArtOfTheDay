import {Dimensions, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const INDICATOR_HEIGHT = 88;
export const CIRCLE_SIZE = 44;
export const CIRCLE_RADIUS = CIRCLE_SIZE / 2;
// Icon centers sit vertically at CIRCLE_RADIUS from the top of the bar
export const ICON_Y = CIRCLE_RADIUS;
export const LEFT_ICON_X = 52;
export const RIGHT_ICON_X = SCREEN_WIDTH - 52;
// How far the bezier control points dip below the icon horizontal line
export const CURVE_DIP = 14;
// Width of each icon touchable (wider than circle to accommodate the label)
export const BUTTON_WIDTH = 64;

export default StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: INDICATOR_HEIGHT,
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    movingCircle: {
        position: 'absolute',
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_RADIUS,
        backgroundColor: '#ffffff',
        // Base position aligned with left icon center
        top: ICON_Y - CIRCLE_RADIUS,
        left: LEFT_ICON_X - CIRCLE_RADIUS,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
        zIndex: 2,
    },
    iconButton: {
        position: 'absolute',
        width: BUTTON_WIDTH,
        top: 0,
        alignItems: 'center',
        zIndex: 3,
    },
    iconWrapper: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconLabel: {
        marginTop: 3,
        fontSize: 11,
        fontFamily: 'Lato-Bold',
        color: '#1a1a1a',
        letterSpacing: 0.2,
    },
});
