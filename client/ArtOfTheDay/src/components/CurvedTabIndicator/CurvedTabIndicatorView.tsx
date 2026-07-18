import {Dimensions, TouchableOpacity} from 'react-native';
import type {SharedValue} from 'react-native-reanimated';
import Animated, {Extrapolation, interpolate, useAnimatedStyle,} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {Ionicons} from '@expo/vector-icons';
import style, {
    BUTTON_WIDTH,
    ICON_Y,
    INDICATOR_HEIGHT,
    LEFT_ICON_X,
    LINE_MARGIN,
    MID_ICON_X,
    RIGHT_ICON_X,
} from './CurvedTabIndicatorViewStyle';

type Props = {
    scrollProgress: SharedValue<number>;
    onTabPress: (index: number) => void;
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const PATH_LEFT = `M ${LEFT_ICON_X + LINE_MARGIN} ${ICON_Y} L ${MID_ICON_X - LINE_MARGIN} ${ICON_Y}`;
const PATH_RIGHT = `M ${MID_ICON_X + LINE_MARGIN} ${ICON_Y} L ${RIGHT_ICON_X - LINE_MARGIN} ${ICON_Y}`;

export default function CurvedTabIndicatorView({scrollProgress, onTabPress}: Props) {
    const circleStyle = useAnimatedStyle(() => {
        const x = interpolate(scrollProgress.value, [0, 1, 2], [LEFT_ICON_X, MID_ICON_X, RIGHT_ICON_X], Extrapolation.CLAMP);
        return {
            transform: [{translateX: x - LEFT_ICON_X}],
        };
    });

    const leftIconStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollProgress.value, [0, 0.6], [1, 0.28], Extrapolation.CLAMP),
    }));

    const midIconStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollProgress.value, [0.4, 1, 1.6], [0.28, 1, 0.28], Extrapolation.CLAMP),
    }));

    const rightIconStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollProgress.value, [1.4, 2], [0.28, 1], Extrapolation.CLAMP),
    }));

    return (
        <Animated.View style={style.container}>
            <Svg width={SCREEN_WIDTH} height={INDICATOR_HEIGHT} style={style.svg}>
                <Path d={PATH_LEFT} stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} fill="none"/>
                <Path d={PATH_RIGHT} stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} fill="none"/>
            </Svg>

            <Animated.View style={[style.movingCircle, circleStyle]}/>

            <TouchableOpacity
                style={[style.iconButton, {left: LEFT_ICON_X - BUTTON_WIDTH / 2}]}
                onPress={() => onTabPress(0)}
                activeOpacity={0.75}
            >
                <Animated.View style={[style.iconWrapper, leftIconStyle]}>
                    <Ionicons name="heart" size={22} color="#000000"/>
                </Animated.View>
                <Animated.Text style={[style.iconLabel, leftIconStyle]}>
                    Liked art
                </Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[style.iconButton, {left: MID_ICON_X - BUTTON_WIDTH / 2}]}
                onPress={() => onTabPress(1)}
                activeOpacity={0.75}
            >
                <Animated.View style={[style.iconWrapper, midIconStyle]}>
                    <Ionicons name="person-sharp" size={22} color="#000000"/>
                </Animated.View>
                <Animated.Text style={[style.iconLabel, midIconStyle]}>
                    Personal
                </Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[style.iconButton, {left: RIGHT_ICON_X - BUTTON_WIDTH / 2}]}
                onPress={() => onTabPress(2)}
                activeOpacity={0.75}
            >
                <Animated.View style={[style.iconWrapper, rightIconStyle]}>
                    <Ionicons name="settings-sharp" size={22} color="#000000"/>
                </Animated.View>
                <Animated.Text style={[style.iconLabel, rightIconStyle]}>
                    Settings
                </Animated.Text>
            </TouchableOpacity>
        </Animated.View>
    );
}
